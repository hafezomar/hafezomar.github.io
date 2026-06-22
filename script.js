document.documentElement.classList.remove("no-js");

const nav = document.querySelector(".nav");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section[id]");
const themeButton = document.getElementById("theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const skillPills = document.querySelectorAll(".skill-pill");
const copyButton = document.querySelector(".copy-button");
const heroTitle = document.getElementById("hero-title");

const THEME_KEY = "omar-portfolio-theme";

function readStoredTheme() {
    try {
        return window.localStorage.getItem(THEME_KEY);
    } catch {
        return null;
    }
}

function saveStoredTheme(value) {
    try {
        window.localStorage.setItem(THEME_KEY, value);
    } catch {
        // Theme still works for the current session when storage is unavailable.
    }
}

function getThemeLabel() {
    return themeButton ? themeButton.querySelector(".theme-label") : null;
}

function updateThemeButton(isDark) {
    if (!themeButton) return;

    themeButton.setAttribute("aria-pressed", String(isDark));
    themeButton.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");

    const label = getThemeLabel();
    if (label) {
        label.textContent = isDark ? "Light" : "Dark";
    }
}

function typeHeroName() {
    if (!heroTitle) return;

    const fullName = heroTitle.textContent.trim();
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
        heroTitle.textContent = fullName;
        heroTitle.classList.add("typing-complete");
        return;
    }

    heroTitle.textContent = "";
    heroTitle.classList.add("typing-name");

    let index = 0;
    const typingSpeed = 105;

    function typeNextCharacter() {
        if (index >= fullName.length) {
            heroTitle.classList.add("typing-complete");
            return;
        }

        heroTitle.textContent += fullName[index];
        index += 1;
        window.setTimeout(typeNextCharacter, typingSpeed);
    }

    typeNextCharacter();
}

function setTheme(isDark) {
    document.body.classList.toggle("dark-mode", isDark);
    saveStoredTheme(isDark ? "dark" : "light");
    updateThemeButton(isDark);
}

function loadTheme() {
    const savedTheme = readStoredTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setTheme(savedTheme ? savedTheme === "dark" : prefersDark);
}

function closeNav() {
    if (!nav || !navToggle) return;

    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
}

if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
        const isOpen = nav.classList.toggle("open");
        navToggle.setAttribute("aria-expanded", String(isOpen));
    });
}

navLinks.forEach((link) => {
    link.addEventListener("click", () => closeNav());
});

if (themeButton) {
    themeButton.addEventListener("click", () => {
        setTheme(!document.body.classList.contains("dark-mode"));
    });
}

if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (!visibleSections.length) return;

            const currentId = visibleSections[0].target.id;

            navLinks.forEach((link) => {
                const isCurrent = link.getAttribute("href") === `#${currentId}`;
                link.classList.toggle("active", isCurrent);

                if (isCurrent) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        {
            rootMargin: "-20% 0px -55% 0px",
            threshold: [0.1, 0.25, 0.5]
        }
    );

    sections.forEach((section) => navObserver.observe(section));

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
    document.querySelectorAll(".reveal").forEach((element) => element.classList.add("show"));
}

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const filter = button.dataset.filter;

        filterButtons.forEach((item) => {
            const isActive = item === button;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-pressed", String(isActive));
        });

        skillPills.forEach((pill) => {
            const types = pill.dataset.type.split(" ");
            const show = filter === "all" || types.includes(filter);

            pill.classList.toggle("is-muted", filter !== "all" && !show);
            pill.classList.toggle("is-highlighted", filter !== "all" && show);
        });
    });
});

if (copyButton) {
    copyButton.addEventListener("click", async () => {
        const email = copyButton.dataset.copy;
        const originalText = copyButton.textContent;

        try {
            await navigator.clipboard.writeText(email);
            copyButton.textContent = "Copied";
            copyButton.classList.add("copied");
        } catch {
            copyButton.textContent = email;
        }

        window.setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.classList.remove("copied");
        }, 1800);
    });
}

loadTheme();
typeHeroName();
