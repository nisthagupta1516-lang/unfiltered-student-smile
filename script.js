
/* ===== CTRL DIARY INTERACTION ===== */

const diaryTrigger = document.getElementById("diaryTrigger");
const diaryHint = document.getElementById("diaryHint");
const letterCard = document.getElementById("letterCard");
const closeLetter = document.getElementById("closeLetter");
const releaseBtn = document.getElementById("releaseBtn");
const wordField = document.getElementById("wordField");
const ctrlSection = document.getElementById("next-section");
const ctrlFooter = document.getElementById("ctrlFooter");

let wordsReleased = false;

const pressureWords = [
    "STAGE FEAR",
    "SELF-DOUBT",
    "NO FRIENDS",
    "OVERTHINKING",
    "EXPECTATIONS",
    "FEAR OF FAILURE",
    "NOT GOOD ENOUGH",
    "PEOPLE PLEASING",
    "COMPARISON",
    "LONELINESS",
    "FUTURE ANXIETY",
    "BURNOUT",
    "FEAR OF JUDGEMENT",
    "HIDDEN TEARS",
    "ACADEMIC PRESSURE",
    "NEEDING APPROVAL",
    "WHAT IF I FAIL?",
    "I NEED A BREAK",
    "AM I ENOUGH?",
    "UNSPOKEN FEELINGS"
];

// Open the diary
diaryTrigger.addEventListener("click", function () {
    if (wordsReleased) return;

    diaryTrigger.classList.add("is-open");
    diaryTrigger.setAttribute("aria-expanded", "true");

    letterCard.classList.add("show");
    letterCard.setAttribute("aria-hidden", "false");

    diaryHint.textContent = "A LETTER TO YOURSELF";
});

// Close the letter
closeLetter.addEventListener("click", function (event) {
    event.stopPropagation();

    letterCard.classList.remove("show");
    letterCard.setAttribute("aria-hidden", "true");

    diaryTrigger.classList.remove("is-open");
    diaryTrigger.setAttribute("aria-expanded", "false");

    diaryHint.textContent = "CLICK TO OPEN ↗";
});

// Release all the hidden thoughts
releaseBtn.addEventListener("click", function () {
    if (wordsReleased) return;

    wordsReleased = true;

    letterCard.classList.remove("show");
    letterCard.setAttribute("aria-hidden", "true");

    diaryTrigger.classList.remove("is-open");
    diaryTrigger.setAttribute("aria-expanded", "false");

    diaryTrigger.style.opacity = "0.35";
    diaryTrigger.style.pointerEvents = "none";

    diaryHint.textContent = "SOME THINGS ARE NOW SAID.";

    ctrlFooter.textContent =
        "YOU ARE NOT ALONE IN WHAT YOU FEEL.";

    // Find the diary's position inside the section
    const sectionRect = ctrlSection.getBoundingClientRect();
    const diaryRect = diaryTrigger.getBoundingClientRect();

    const originX =
        diaryRect.left + diaryRect.width / 2 - sectionRect.left;

    const originY =
        diaryRect.top + diaryRect.height / 2 - sectionRect.top;

    // Create the floating word bubbles
    pressureWords.forEach(function (word, index) {
        const bubble = document.createElement("span");

        bubble.className = "word-bubble";

        if (index % 4 === 0) {
            bubble.classList.add("big");
        }

        bubble.textContent = word;

        bubble.style.left = originX + "px";
        bubble.style.top = originY + "px";

        // Spread bubbles in different directions
        const angle =
            (index / pressureWords.length) * Math.PI * 2 +
            (Math.random() - 0.5) * 0.6;

        const distance = 100 + Math.random() * 260;

        let moveX = Math.cos(angle) * distance;
        let moveY = Math.sin(angle) * distance;

        // Keep the final bubbles within the visible section
        const maxX = Math.max(20, sectionRect.width - originX - 110);
        const minX = Math.min(-20, -originX + 110);

        const maxY = Math.max(20, sectionRect.height - originY - 40);
        const minY = Math.min(-20, -originY + 40);

        moveX = Math.max(minX, Math.min(maxX, moveX));
        moveY = Math.max(minY, Math.min(maxY, moveY));

        bubble.style.setProperty("--move-x", moveX + "px");
        bubble.style.setProperty("--move-y", moveY + "px");

        bubble.style.setProperty(
            "--tilt",
            (Math.random() * 24 - 12) + "deg"
        );

        bubble.style.setProperty(
            "--duration",
            (2.5 + Math.random() * 1.5) + "s"
        );

        bubble.style.setProperty(
            "--delay",
            (index * 0.045) + "s"
        );

        wordField.appendChild(bubble);
    });
});
