(() => {
  const target = document.getElementById("site-cta");
  if (!target) return;

  fetch("cta.html")
    .then((response) => {
      if (!response.ok) throw new Error("CTA load failed");
      return response.text();
    })
    .then((html) => {
      target.outerHTML = html;
    })
    .catch(() => {
      // Silent fail to avoid blocking page render.
    });
})();