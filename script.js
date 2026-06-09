const menu = document.getElementById("menu");
const links = document.querySelectorAll("#menu a");
const sections = document.querySelectorAll("main section");
const themeButton = document.getElementById("theme-toggle");
const nameElement = document.querySelector(".header-text h1");

const THEME_KEY = "omar-portfolio-theme";

function updateThemeButton() {
    if (!themeButton) return;

    const isDarkMode = document.body.classList.contains("dark-mode");

    themeButton.textContent = isDarkMode ? "Light Mode" : "Dark Mode";
    themeButton.setAttribute("aria-pressed", isDarkMode);
}

function applySavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const useDarkMode =
        savedTheme === "dark" ||
        (savedTheme === null && prefersDark);

    document.body.classList.toggle("dark-mode", useDarkMode);
    updateThemeButton();
}

function createMobileMenuToggle() {
    if (!menu || menu.querySelector(".menu-toggle")) return;

    const button = document.createElement("button");

    button.type = "button";
    button.className = "menu-toggle";
    button.textContent = "Menu";
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", "Toggle navigation menu");

    button.addEventListener("click", () => {
        const isOpen = menu.classList.toggle("open");

        button.textContent = isOpen ? "Close Menu" : "Menu";
        button.setAttribute("aria-expanded", String(isOpen));
    });

    menu.prepend(button);
}

function closeMobileMenu() {
    if (!menu) return;

    menu.classList.remove("open");

    const button = menu.querySelector(".menu-toggle");

    if (button) {
        button.textContent = "Menu";
        button.setAttribute("aria-expanded", "false");
    }
}

function typeName() {
    if (!nameElement) return;

    const fullName = "Omar HAFEZ";
    const typingSpeed = 120;

    nameElement.textContent = "";
    nameElement.classList.add("typing-name");

    let index = 0;

function typeNextCharacter() {
    if (index >= fullName.length) {
        nameElement.classList.add("typing-complete");
        return;
    }

    nameElement.textContent += fullName[index];
    index++;

    setTimeout(typeNextCharacter, typingSpeed);
}

    typeNextCharacter();
}

links.forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId = link.getAttribute("href");

        if (!targetId || !targetId.startsWith("#")) return;

        const targetSection = document.querySelector(targetId);

        if (!targetSection) return;

        event.preventDefault();

        targetSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

        closeMobileMenu();
    });
});

if ("IntersectionObserver" in window) {
    const navigationObserver = new IntersectionObserver(
        (entries) => {
            const visibleSections = entries
                .filter((entry) => entry.isIntersecting)
                .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

            if (visibleSections.length === 0) return;

            const currentSectionId = visibleSections[0].target.id;

            links.forEach((link) => {
                const isActive =
                    link.getAttribute("href") === `#${currentSectionId}`;

                link.classList.toggle("active", isActive);

                if (isActive) {
                    link.setAttribute("aria-current", "page");
                } else {
                    link.removeAttribute("aria-current");
                }
            });
        },
        {
            rootMargin: "-20% 0px -60% 0px",
            threshold: [0.1, 0.25, 0.5]
        }
    );

    sections.forEach((section) => {
        navigationObserver.observe(section);
    });
}

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            THEME_KEY,
            isDarkMode ? "dark" : "light"
        );

        updateThemeButton();
    });
}

const fadeElements = document.querySelectorAll("main > section");

const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if (!prefersReducedMotion && "IntersectionObserver" in window) {
    fadeElements.forEach((element) => {
        element.classList.add("fade-in");
    });

    const fadeObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                entry.target.classList.add("show");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12
        }
    );

    fadeElements.forEach((element) => {
        fadeObserver.observe(element);
    });
} else {
    fadeElements.forEach((element) => {
        element.classList.add("show");
    });
}

applySavedTheme();
createMobileMenuToggle();

if (prefersReducedMotion) {
    if (nameElement) {
        nameElement.textContent = "Omar HAFEZ";
    }
} else {
    typeName();
}