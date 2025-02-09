document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");

    if (!pizza) {
        console.error("Pizza container not found!");
        return;
    }

    let connections = {};
    let selectedSlice = null;

    // Create 8 pizza slice emojis dynamically
    for (let i = 1; i <= 8; i++) {
        let slice = document.createElement("div");
        slice.className = "slice";
        slice.dataset.index = i;
        slice.innerHTML = "🍕"; // Emoji as the slice
        slice.style.position = "absolute";
        slice.style.fontSize = "40px";
        slice.style.width = "50px";
        slice.style.height = "50px";
        slice.style.display = "flex";
        slice.style.alignItems = "center";
        slice.style.justifyContent = "center";
        slice.style.transition = "transform 0.3s ease-in-out";

        // Position each slice radially
        let angle = (i - 1) * 45; // Spaced evenly in a circular pattern
        let radius = 90; // Distance from center
        let x = Math.cos(angle * (Math.PI / 180)) * radius;
        let y = Math.sin(angle * (Math.PI / 180)) * radius;
        slice.style.transform = `translate(${x}px, ${y}px)`;

        // Hover effect to enlarge the slice
        slice.addEventListener("mouseover", function () {
            slice.style.transform = `translate(${x}px, ${y}px) scale(1.2)`;
        });

        slice.addEventListener("mouseleave", function () {
            slice.style.transform = `translate(${x}px, ${y}px)`;
        });

        // Click event to open input box
        slice.addEventListener("click", function () {
            selectedSlice = i;
            openInputBox(i);
        });

        pizza.appendChild(slice);
    }

    function openInputBox(index) {
        const inputBox = document.getElementById("input-box");
        const nameInput = document.getElementById("nameInput");
        const linkInput = document.getElementById("linkInput");

        inputBox.style.display = "block";

        if (connections[index]) {
            nameInput.value = connections[index].name;
            linkInput.value = connections[index].link;
        } else {
            nameInput.value = "";
            linkInput.value = "";
        }
    }

    window.submitConnection = function () {
        if (selectedSlice === null) return;

        const name = document.getElementById("nameInput").value.trim();
        const link = document.getElementById("linkInput").value.trim();

        if (name && link) {
            connections[selectedSlice] = { name, link };
            updateSlice(selectedSlice, name, link);
            document.getElementById("input-box").style.display = "none";
        }
    };

    function updateSlice(index, name, link) {
        let slice = document.querySelector(`.slice[data-index="${index}"]`);
        if (slice) {
            slice.innerHTML = `
                <a href="${link}" target="_blank" style="text-decoration:none; font-size:40px;">
                    🍕<br><span style="font-size:12px; color:white;">${name}</span>
                </a>
            `;
        }
    }
});
