(() => {
  const photos = window.FILM_GALLERY || [];
  const pageSize = 12;
  const grid = document.getElementById("gallery-grid");
  const cards = [...grid.querySelectorAll(".frame")];
  const filter = document.getElementById("roll-filter");
  const previousPage = document.getElementById("previous-page");
  const nextPage = document.getElementById("next-page");
  const pageStatus = document.getElementById("page-status");
  const dialog = document.getElementById("lightbox");
  const viewerImage = document.getElementById("lightbox-image");
  const viewerCount = document.getElementById("lightbox-count");
  const viewerCaption = document.getElementById("lightbox-caption");
  const previousPhoto = document.getElementById("previous-photo");
  const nextPhoto = document.getElementById("next-photo");
  const rollCounts = new Map();
  for (const photo of photos) rollCounts.set(photo.roll, (rollCounts.get(photo.roll) || 0) + 1);
  const rolls = [...rollCounts.keys()].sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }));
  let activeRoll = "all";
  let activePage = 1;
  let activePhoto = null;
  let syncing = false;

  function currentList() { return activeRoll === "all" ? photos : photos.filter(photo => photo.roll === activeRoll); }
  function address(photoId = null) {
    const url = new URL(window.location.href);
    if (activeRoll === "all") url.searchParams.delete("roll"); else url.searchParams.set("roll", activeRoll);
    if (activePage === 1) url.searchParams.delete("page"); else url.searchParams.set("page", String(activePage));
    if (photoId) url.searchParams.set("photo", photoId); else url.searchParams.delete("photo");
    return url;
  }
  function renderFilters() {
    filter.replaceChildren();
    for (const [roll, count] of [["all", photos.length], ...rolls.map(roll => [roll, rollCounts.get(roll)])]) {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.roll = roll;
      button.setAttribute("aria-pressed", String(activeRoll === roll));
      button.innerHTML = `<span>${roll === "all" ? "全部胶片" : `卷 ${roll}`}</span><small>${count}</small>`;
      button.addEventListener("click", () => {
        activeRoll = roll; activePage = 1;
        history.pushState(null, "", address());
        render(); document.getElementById("gallery").scrollIntoView({ behavior: "smooth" });
      });
      filter.append(button);
    }
  }
  function render() {
    const list = currentList();
    const pages = Math.max(1, Math.ceil(list.length / pageSize));
    activePage = Math.min(Math.max(activePage, 1), pages);
    const visible = new Set(list.slice((activePage - 1) * pageSize, activePage * pageSize).map(photo => photo.id));
    for (const card of cards) card.hidden = !visible.has(card.dataset.id);
    pageStatus.textContent = `${String(activePage).padStart(2, "0")} / ${String(pages).padStart(2, "0")}`;
    previousPage.disabled = activePage <= 1;
    nextPage.disabled = activePage >= pages;
    renderFilters();
  }
  function showPhoto(id, push = true) {
    const list = currentList();
    const index = list.findIndex(photo => photo.id === id);
    if (index < 0) return;
    const photo = list[index];
    activePhoto = id;
    viewerImage.src = photo.full;
    viewerImage.alt = `胶片卷 ${photo.roll}，第 ${photo.frame} 张`;
    viewerCount.textContent = `${String(index + 1).padStart(2, "0")} / ${String(list.length).padStart(2, "0")}`;
    viewerCaption.textContent = `ROLL ${photo.roll} · FRAME ${photo.frame}`;
    previousPhoto.disabled = index === 0;
    nextPhoto.disabled = index === list.length - 1;
    if (!dialog.open) dialog.showModal();
    if (push) history.pushState(null, "", address(id));
  }
  function movePhoto(direction) {
    const list = currentList();
    const index = list.findIndex(photo => photo.id === activePhoto);
    if (index + direction >= 0 && index + direction < list.length) showPhoto(list[index + direction].id, false);
    history.replaceState(null, "", address(activePhoto));
  }
  function closePhoto() { if (dialog.open) dialog.close(); }
  function restoreFromAddress() {
    const params = new URLSearchParams(window.location.search);
    const roll = params.get("roll") || "all";
    activeRoll = rollCounts.has(roll) ? roll : "all";
    const page = Number.parseInt(params.get("page") || "1", 10);
    activePage = Number.isFinite(page) ? page : 1;
    const photoId = params.get("photo");
    const photo = photos.find(item => item.id === photoId);
    if (photo && activeRoll !== "all" && photo.roll !== activeRoll) activeRoll = photo.roll;
    render();
    syncing = true;
    if (photo) showPhoto(photo.id, false); else closePhoto();
    syncing = false;
  }

  grid.addEventListener("click", event => {
    const anchor = event.target.closest(".frame-link");
    if (!anchor) return;
    event.preventDefault();
    showPhoto(anchor.closest(".frame").dataset.id);
  });
  previousPage.addEventListener("click", () => { activePage--; history.pushState(null, "", address()); render(); document.getElementById("gallery").scrollIntoView({ behavior: "smooth" }); });
  nextPage.addEventListener("click", () => { activePage++; history.pushState(null, "", address()); render(); document.getElementById("gallery").scrollIntoView({ behavior: "smooth" }); });
  previousPhoto.addEventListener("click", () => movePhoto(-1));
  nextPhoto.addEventListener("click", () => movePhoto(1));
  document.getElementById("close-lightbox").addEventListener("click", closePhoto);
  dialog.addEventListener("click", event => { if (event.target === dialog) closePhoto(); });
  dialog.addEventListener("close", () => { activePhoto = null; viewerImage.removeAttribute("src"); if (!syncing) history.replaceState(null, "", address()); });
  document.addEventListener("keydown", event => {
    if (!dialog.open) return;
    if (event.key === "ArrowLeft") { event.preventDefault(); movePhoto(-1); }
    if (event.key === "ArrowRight") { event.preventDefault(); movePhoto(1); }
  });
  window.addEventListener("popstate", restoreFromAddress);
  restoreFromAddress();
})();
