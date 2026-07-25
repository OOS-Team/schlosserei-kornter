(() => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const nav = document.getElementById("nav");
  const toggle = document.getElementById("navToggle");

  if (nav && toggle) {
    const setOpen = (open) => {
      nav.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menü schließen" : "Menü öffnen");
    };

    toggle.addEventListener("click", () => {
      setOpen(!nav.classList.contains("is-open"));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => setOpen(false));
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") setOpen(false);
    });
  }

  // Sticky header shadow on scroll
  const header = document.querySelector(".site-header");
  if (header) {
    const onScroll = () => {
      header.style.boxShadow =
        window.scrollY > 8 ? "0 8px 24px rgba(0,0,0,0.25)" : "none";
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // Contact form – opens mail client with structured message
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const data = new FormData(form);
      const name = String(data.get("name") || "").trim();
      const email = String(data.get("email") || "").trim();
      const phone = String(data.get("phone") || "").trim();
      const topic = String(data.get("topic") || "allgemein");
      const message = String(data.get("message") || "").trim();
      const privacy = form.querySelector("#privacy");

      if (!name || !email || !message || !(privacy && privacy.checked)) {
        if (status) {
          status.textContent = "Bitte füllen Sie alle Pflichtfelder aus und bestätigen Sie den Datenschutz.";
          status.classList.add("is-error");
        }
        return;
      }

      const topicLabels = {
        allgemein: "Allgemeine Anfrage",
        treppe: "Treppen & Geländer",
        balkon: "Balkone & Überdachungen",
        tor: "Tore, Türen & Einbruchschutz",
        stahlbau: "Stahlbau / Gewerbe",
        sonstiges: "Sonstiges",
      };

      const subject = encodeURIComponent(
        `Anfrage über Website: ${topicLabels[topic] || topic} – ${name}`
      );

      const body = encodeURIComponent(
        [
          `Name: ${name}`,
          `E-Mail: ${email}`,
          phone ? `Telefon: ${phone}` : null,
          `Anliegen: ${topicLabels[topic] || topic}`,
          "",
          "Nachricht:",
          message,
        ]
          .filter(Boolean)
          .join("\n")
      );

      if (status) {
        status.textContent = "Ihr E-Mail-Programm wird geöffnet …";
        status.classList.remove("is-error");
      }

      window.location.href = `mailto:info@kornter.de?subject=${subject}&body=${body}`;
    });
  }
})();
