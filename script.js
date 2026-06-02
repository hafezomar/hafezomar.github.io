let links = document.querySelectorAll("#menu a");

for (let link of links) {
    link.addEventListener("click", function(event) {
        event.preventDefault();

        let targetId = link.getAttribute("href");
        let targetSection = document.querySelector(targetId);

        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
}

let sections = document.querySelectorAll("section");

window.addEventListener("scroll", function() {
    let currentSectionId = "";

    for (let section of sections) {
        let sectionTop = section.offsetTop - 120;

        if (window.scrollY >= sectionTop) {
            currentSectionId = section.getAttribute("id");
        }
    }

    for (let link of links) {
        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSectionId) {
            link.classList.add("active");
        }
    }
});

let themeButton = document.getElementById("theme-toggle");

if (themeButton) {
    themeButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            themeButton.innerText = "Light Mode";
        } else {
            themeButton.innerText = "Dark Mode";
        }
    });
}
const fadeElements = document.querySelectorAll("section, .project-card, .skill-card");

fadeElements.forEach((element) => {
    element.classList.add("fade-in");
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

fadeElements.forEach((element) => {
    observer.observe(element);
});
