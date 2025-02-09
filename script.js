document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");

    if (!pizza) {
        console.error("Pizza container not found!");
        return;
    }

    let connections = {};
    let selectedSlice = null;

    // Create 8 slices dynamically
    for (let i = 1; i <= 8; i++) {
        let slice = document.createElement("div");
        slice.className = "slice";
        slice.dataset.index = i;
        slice.style.position = "absolute";
        slice.style.width = "50%";
        slice.style.height = "50%";
        slice.style.clipPath = "polygon(50% 50%, 100% 0, 0 0)";
        slice.style.backgroundColor = "#ffcc00"; // Yellow slice
        slice.style.border = "2px solid #ff8c00"; // Orange crust
        slice.style.transformOrigin = "50% 50%";
        slice.style.transition = "transform 0.3s ease-in-out";

        // Rotate slices to form a full pizza
        slice.style.transform = `rotate(${(i - 1) * 45}deg) translateX(50%) rotate(-${(i - 1) * 45}deg)`;

        // Hover effect
        slice.addEventListener("mouseover", function () {
            slice.style.transform = `rotate(${(i - 1) * 45}deg) translateX(50%) rotate(-${(i - 1) * 45}deg) scale(1.1)`;
        });

        slice.addEventListener("mouseleave", function () {
            slice.style.transform = `rotate(${(i - 1) * 45}deg) translateX(50%) rotate(-${(i - 1) * 45}deg)`;
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
                <a href="${link}" target="_blank" style="display:block; width:100%; height:100%; text-decoration:none;">
                    <span style="display:flex; align-items:center; justify-content:center; font-size:12px; color:white; text-shadow:1px 1px 3px black;">${name}</span>
                </a>
            `;
            slice.style.backgroundColor = "#FF5733"; // Change slice color when filled
        }
    }
});
