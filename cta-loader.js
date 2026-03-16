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

      const root = document.querySelector(".final-cta");
      if (!root) return;

      const form = root.querySelector('form[name="contact"]');
      const popup = root.querySelector("#cta-popup");
      if (!form || !popup) return;

      const popupCard = popup.querySelector(".cta-popup-card");
      const closeTargets = popup.querySelectorAll("[data-popup-close]");
      const submitButton = form.querySelector('button[type="submit"]');

      const handleKeydown = (event) => {
        if (event.key === "Escape") closePopup();
      };

      const openPopup = () => {
        popup.classList.add("is-visible");
        popup.setAttribute("aria-hidden", "false");
        document.addEventListener("keydown", handleKeydown);
        if (popupCard) popupCard.focus();
      };

      const closePopup = () => {
        popup.classList.remove("is-visible");
        popup.setAttribute("aria-hidden", "true");
        document.removeEventListener("keydown", handleKeydown);
      };

      closeTargets.forEach((targetEl) => {
        targetEl.addEventListener("click", closePopup);
      });

      form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (submitButton) submitButton.disabled = true;

        const formData = new FormData(form);
        if (!formData.get("form-name")) {
          formData.set("form-name", form.getAttribute("name") || "contact");
        }

        fetch(form.getAttribute("action") || "/", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams(formData).toString(),
        })
          .then(() => {
            if (typeof window.gtag === "function") {
              window.gtag("event", "conversion", {
                send_to: "AW-17971503408/TXeqCIOLyf0bELDCvflC",
                value: 1.0,
                currency: "GBP",
              });
            }

            form.reset();
            openPopup();
          })
          .catch(() => {
            openPopup();
          })
          .finally(() => {
            if (submitButton) submitButton.disabled = false;
          });
      });
    })
    .catch(() => {
      // Silent fail to avoid blocking page render.
    });
})();
