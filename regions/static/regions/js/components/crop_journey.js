
(() => {
    const journey = document.querySelector(".crop-journey");

    if (!journey) return;

    const buttons = [...journey.querySelectorAll(".journey-stage")];
    const contents = [...journey.querySelectorAll(".journey-content")];
    const artwork = [...journey.querySelectorAll(".journey-art-layer")];
    const progress = journey.querySelector("#journey-progress");
    const counter = journey.querySelector("#journey-counter");
    const nextButton = journey.querySelector("#journey-next");
    const resetButton = journey.querySelector("#journey-reset");

    if (!buttons.length) return;

    let current = 0;

    function selectStage(index) {
        current = index;

        buttons.forEach((button, i) => {
            button.setAttribute("aria-pressed", String(i === index));
        });

        contents.forEach((content, i) => {
            content.classList.toggle("hidden", i !== index);
        });

        const stagePosition = buttons.length === 1
            ? 1
            : index / (buttons.length - 1);

        const visualStage = Math.min(
            3,
            Math.round(stagePosition * 3)
        );

        artwork.forEach((layer, i) => {
            layer.classList.toggle("is-active", i === visualStage);
        });

        progress.style.width = `${stagePosition * 100}%`;

        counter.textContent = `${
            String(index + 1).padStart(2, "0")
        } / ${
            String(buttons.length).padStart(2, "0")
        }`;

        nextButton.textContent = index === buttons.length - 1
            ? "العودة للبداية ↺"
            : "المرحلة التالية ←";
    }

    buttons.forEach((button, index) => {
        button.addEventListener("click", () => {
            selectStage(index);
        });
    });

    nextButton.addEventListener("click", () => {
        selectStage((current + 1) % buttons.length);
    });

    resetButton.addEventListener("click", () => {
        selectStage(0);
    });

    selectStage(0);
})();
