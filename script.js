document.addEventListener("DOMContentLoaded", function () {
    // ===== REVEAL ANIMATIONS (Intersection Observer) =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("reveal");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(".animate").forEach(el => {
        revealObserver.observe(el);
    });

    // ===== SKILL TOOLTIPS =====
    const tooltip = document.getElementById("tooltip");
    const skillTags = document.querySelectorAll(".skill-tag");

    skillTags.forEach(tag => {
        tag.addEventListener("mouseenter", (e) => {
            const info = tag.getAttribute("data-info");
            if (!info) return;

            tooltip.textContent = info;
            tooltip.classList.add("active");

            // Calculate position
            const tagRect = tag.getBoundingClientRect();
            const tooltipRect = tooltip.getBoundingClientRect();
            
            // Position to the right of the tag with some padding
            let x = tagRect.right + 25; 
            let y = tagRect.top + (tagRect.height / 2) - (tooltipRect.height / 2);

            // Boundary checks (especially for mobile)
            if (x + tooltipRect.width > window.innerWidth - 20) {
                // If it goes off-screen to the right, show it above or below instead
                x = tagRect.left + (tagRect.width / 2) - (tooltipRect.width / 2);
                y = tagRect.top - tooltipRect.height - 12;
            }

            // Ensure y is within screen bounds
            if (y < 80) y = 80; // Avoid navbar
            if (y + tooltipRect.height > window.innerHeight - 20) {
                y = window.innerHeight - tooltipRect.height - 20;
            }

            tooltip.style.left = `${x}px`;
            tooltip.style.top = `${y}px`;
            tooltip.style.transform = "translateY(0)";
        });

        tag.addEventListener("mouseleave", () => {
            tooltip.classList.remove("active");
        });
    });

    // ===== SMOOTH SCROLLING FOR NAV LINKS =====
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Adjust for nav height
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===== ACTIVE NAV LINK HIGHLIGHTING =====
    const sections = document.querySelectorAll("section, header, footer");
    const navLinks = document.querySelectorAll(".nav-links a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
});