document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector(".header");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");

    const revealTargets = [
        ...document.querySelectorAll(".section-heading"),
        ...document.querySelectorAll(".about-box"),
        ...document.querySelectorAll(".card"),
        ...document.querySelectorAll(".tech-list span"),
        ...document.querySelectorAll(".contact-item")
    ];

    revealTargets.forEach((el) => {
        el.classList.add("reveal");

        const parentGrid = el.parentElement;

        if (parentGrid && parentGrid.classList.contains("cards-grid")) {
            const siblings = [...parentGrid.children];
            const position = siblings.indexOf(el);
            el.classList.add(`reveal-delay-${Math.min(position + 1, 6)}`);
        }

        if (parentGrid && parentGrid.classList.contains("contact-box")) {
            const siblings = [...parentGrid.children];
            const position = siblings.indexOf(el);
            el.classList.add(`reveal-delay-${Math.min(position + 1, 6)}`);
        }

        if (parentGrid && parentGrid.classList.contains("tech-list")) {
            const siblings = [...parentGrid.children];
            const position = siblings.indexOf(el);
            el.classList.add(`reveal-delay-${Math.min((position % 6) + 1, 6)}`);
        }
    });

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -60px 0px"
        }
    );

    revealTargets.forEach((el) => revealObserver.observe(el));

    const updateHeaderOnScroll = () => {
        if (window.scrollY > 24) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    const updateActiveNav = () => {
        const scrollPosition = window.scrollY + 180;
        let currentSectionId = "";

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                currentSectionId = section.getAttribute("id");
            }
        });

        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 80) {
            currentSectionId = sections[sections.length - 1].id;
        }

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    };

    updateHeaderOnScroll();
    updateActiveNav();

    window.addEventListener("scroll", () => {
        updateHeaderOnScroll();
        updateActiveNav();
    });
});