
(() => {
    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const cropTabs = [
        ...document.querySelectorAll("[data-roots-crop]")
    ];

    const cropPanels = [
        ...document.querySelectorAll("[data-roots-panel]")
    ];

    function selectCrop(cropName) {
        cropTabs.forEach((tab) => {
            const active = tab.dataset.rootsCrop === cropName;

            tab.setAttribute("aria-selected", String(active));
            tab.tabIndex = active ? 0 : -1;
        });

        cropPanels.forEach((panel) => {
            panel.hidden = panel.dataset.rootsPanel !== cropName;
        });
    }

    cropTabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            selectCrop(tab.dataset.rootsCrop);
        });

        tab.addEventListener("keydown", (event) => {
            if (
                event.key !== "ArrowLeft" &&
                event.key !== "ArrowRight"
            ) {
                return;
            }

            event.preventDefault();

            const nextIndex = event.key === "ArrowLeft"
                ? (index + 1) % cropTabs.length
                : (index - 1 + cropTabs.length) % cropTabs.length;

            const nextTab = cropTabs[nextIndex];

            selectCrop(nextTab.dataset.rootsCrop);
            nextTab.focus();
        });
    });

    selectCrop("mango");

    if (typeof Swiper !== "undefined") {
        new Swiper(".farm-swiper", {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 850,
            grabCursor: true,
            autoplay: reduceMotion ? false : {
                delay: 4500,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
            },
            navigation: {
                nextEl: ".farm-next",
                prevEl: ".farm-prev"
            },
            pagination: {
                el: ".farm-swiper .swiper-pagination",
                clickable: true
            },
            keyboard: {
                enabled: true
            },
            on: {
                slideChange: function () {
                    const counter = document.getElementById(
                        "farm-current-slide"
                    );

                    if (counter) {
                        counter.textContent = String(
                            this.realIndex + 1
                        ).padStart(2, "0");
                    }
                }
            }
        });
    }

    if (!reduceMotion && typeof gsap !== "undefined") {
        gsap.from(".roots-hero-reveal", {
            opacity: 0,
            y: 55,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        });

        if (typeof ScrollTrigger !== "undefined") {
            gsap.registerPlugin(ScrollTrigger);

            gsap.utils.toArray(".roots-reveal").forEach((element) => {
                gsap.from(element, {
                    opacity: 0,
                    y: 55,
                    duration: 0.9,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: element,
                        start: "top 92%",
                        once: true
                    }
                });
            });
        }
    }
})();
