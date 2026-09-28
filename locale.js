// Keep the current article section or gallery selection when changing language.
document.querySelectorAll('.language-switcher a').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const destination = new URL(link.href, location.origin);
    destination.search = location.search;
    destination.hash = location.hash;
    if (destination.href === location.href) return;
    event.preventDefault();
    location.assign(destination.href);
  });
});
