(() => {
  const target = document.getElementById("site-footer");
  if (!target) return;

  fetch("footer.html")
    .then((response) => {
      if (!response.ok) throw new Error("Footer load failed");
      return response.text();
    })
    .then((html) => {
      target.outerHTML = html;

      const footer = document.querySelector("footer.footer");
      if (!footer) return;

      const path = window.location.pathname;
      const isIndex = path.endsWith("/") || path.endsWith("/index.html") || path.endsWith("index.html");

      if (!isIndex) {
        footer.querySelectorAll('a[href^="#"]').forEach((link) => {
          const href = link.getAttribute("href");
          if (href) link.setAttribute("href", `index.html${href}`);
        });
      }
    })
    .catch(() => {
      // Silent fail to avoid blocking page render.
    });
})();