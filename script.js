document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");
    const connectionsTableBody = document.getElementById("connectionsTableBody");

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
        slice.style.cursor = "pointer";

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
        const titleInput = document.getElementById("titleInput");
        const noteInput = document.getElementById("noteInput");
        const toppingInput = document.getElementById("toppingInput");
        const linkInput = document.getElementById("linkInput");

        inputBox.style.display = "block";

        if (connections[index]) {
            nameInput.value = connections[index].name;
            titleInput.value = connections[index].title;
            noteInput.value = connections[index].note;
            toppingInput.value = connections[index].topping;
            linkInput.value = connections[index].link;
        } else {
            nameInput.value = "";
            titleInput.value = "";
            noteInput.value = "";
            toppingInput.value = "";
            linkInput.value = "";
        }
    }

    window.submitConnection = function () {
        if (selectedSlice === null) return;

        const name = document.getElementById("nameInput").value.trim();
        const title = document.getElementById("titleInput").value.trim();
        const note = document.getElementById("noteInput").value.trim();
        const topping = document.getElementById("toppingInput").value.trim();
        const link = document.getElementById("linkInput").value.trim();

        if (name && link) {
            connections[selectedSlice] = { name, title, note, topping, link };
            updateSlice(selectedSlice, name, topping);
            updateTable();
            document.getElementById("input-box").style.display = "none";
        }
    };

    function updateSlice(index, name, topping) {
        let slice = document.querySelector(`path[data-index="${index}"]`);
        if (slice) {
            slice.setAttribute("fill", "#FF5733"); // Change slice color when filled
            
            let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
            text.setAttribute("x", 0);
            text.setAttribute("y", -radius / 2);
            text.setAttribute("fill", "black");
            text.setAttribute("font-size", "10px");
            text.setAttribute("text-anchor", "middle");
            text.textContent = `${topping} ${name}`;
            pizza.appendChild(text);
        }
    }

    function updateTable() {
        connectionsTableBody.innerHTML = "";
        Object.keys(connections).forEach(index => {
            let connection = connections[index];
            let row = `
                <tr>
                    <td>Slice ${parseInt(index) + 1}</td>
                    <td>${connection.topping}</td>
                    <td>${connection.name}</td>
                    <td>${connection.title}</td>
                    <td>${connection.note}</td>
                </tr>
            `;
            connectionsTableBody.innerHTML += row;
        });
    }
});
