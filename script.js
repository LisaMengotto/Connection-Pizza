document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");

    if (!pizza) {
        console.error("Pizza container not found!");
        return;
    }

    let connections = {};
    let selectedSlice = null;
    const numSlices = 8;
    const radius = 100;

    // Function to create SVG paths for slices
    function createSlice(index) {
        const angle = (2 * Math.PI) / numSlices;
        const startAngle = index * angle;
        const endAngle = startAngle + angle;

        const x1 = radius * Math.cos(startAngle);
        const y1 = radius * Math.sin(startAngle);
        const x2 = radius * Math.cos(endAngle);
        const y2 = radius * Math.sin(endAngle);

        const largeArcFlag = angle > Math.PI ? 1 : 0;
        const pathData = `
            M 0 0 
            L ${x1} ${y1} 
            A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} 
            Z
        `;

        let slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
        slice.setAttribute("d", pathData);
        slice.setAttribute("fill", "#ffcc00"); // Yellow cheese
        slice.setAttribute("stroke", "#ff8c00"); // Orange crust
        slice.setAttribute("stroke-width", "5");
        slice.setAttribute("data-index", index);
        slice.style.transition = "transform 0.3s ease-in-out";
        slice.style.cursor = "pointer";

        // Hover effect
        slice.addEventListener("mouseover", function () {
            slice.style.transform = "scale(1.1)";
        });
        slice.addEventListener("mouseleave", function () {
            slice.style.transform = "scale(1)";
        });

        // Click event to open input box
        slice.addEventListener("click", function () {
            selectedSlice = index;
            openInputBox(index);
        });

        return slice;
    }

    // Generate 8 slices
    for (let i = 0; i < numSlices; i++) {
        let slice = createSlice(i);
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
        let slice = document.querySelector(`path[data-index="${index}"]`);
        if (slice) {
            slice.setAttribute("fill", "#FF5733"); // Change slice color when filled
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 0);
            text.setAttribute("y", -radius / 2);
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", "10px");
            text.setAttribute("text-anchor", "middle");
            text.textContent = name;
            pizza.appendChild(text);
        }
    }
});
