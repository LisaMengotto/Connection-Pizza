document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");

    if (!pizza) {
        console.error("Pizza container not found!");
        return;
    }

    let connections = {};
    let selectedSlice = null;

    // Create 8 pizza slices dynamically
    for (let i = 1; i <= 8; i++) {
        let slice = document.createElement("div");
        slice.className = "slice";
        slice.dataset.index = i;

        // Rotate slices evenly around the center
        let angle = (i - 1) * 45; // 360 degrees divided by 8 slices
        slice.style.transform = `rotate(${angle}deg)`;

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
                <a href="${link}" target="_blank" style="text-decoration:none; color:black; font-weight:bold;">
                    ${name}
                </a>
            `;
        }
    }
});
