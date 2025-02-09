document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");
    const inputBox = document.getElementById("input-box");
    const nameInput = document.getElementById("nameInput");
    const linkInput = document.getElementById("linkInput");

    let selectedSlice = null;
    let connections = {};

    // Create 8 slices dynamically
    for (let i = 1; i <= 8; i++) {
        let slice = document.createElement("div");
        slice.className = "slice";
        slice.dataset.index = i;
        slice.addEventListener("click", () => openInputBox(i));
        pizza.appendChild(slice);
    }

    function openInputBox(index) {
        selectedSlice = index;
        inputBox.style.display = "block";

        // If slice already has data, prefill inputs
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

        const name = nameInput.value.trim();
        const link = linkInput.value.trim();

        if (name && link) {
            connections[selectedSlice] = { name, link };
            updateSlice(selectedSlice, name, link);
            inputBox.style.display = "none";
        }
    };

    function updateSlice(index, name, link) {
        let slice = document.querySelector(`.slice[data-index="${index}"]`);
        if (slice) {
            slice.innerHTML = `
                <a href="${link}" target="_blank" style="display:block; width:100%; height:100%; text-decoration:none;">
                    <span style="display:flex; align-items:center; justify-content:center; font-size:12px; color:white; text-shadow:1px 1px 3px black;">${name}</span>
                </a>
            `;
            slice.style.backgroundColor = "#FF5733"; // Change slice color when filled
        }
    }
});
