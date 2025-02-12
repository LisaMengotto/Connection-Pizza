document.addEventListener("DOMContentLoaded", function () {
    const pizza = document.getElementById("pizza");
    const connectionsTableBody = document.getElementById("connectionsTableBody");

    let connections = JSON.parse(localStorage.getItem("connections")) || {};
    let selectedSlice = null;
    const numSlices = 8;
    const radius = 100;

    function createSlice(index) {
        const angle = (2 * Math.PI) / numSlices;
        const startAngle = index * angle;
        const endAngle = startAngle + angle;

        const x1 = radius * Math.cos(startAngle);
        const y1 = radius * Math.sin(startAngle);
        const x2 = radius * Math.cos(endAngle);
        const y2 = radius * Math.sin(endAngle);

        const pathData = `
            M 0 0 
            L ${x1} ${y1} 
            A ${radius} ${radius} 0 0 1 ${x2} ${y2} 
            Z
        `;

        let slice = document.createElementNS("http://www.w3.org/2000/svg", "path");
        slice.setAttribute("d", pathData);
        slice.setAttribute("fill", "#ffcc00");
        slice.setAttribute("stroke", "#ff8c00");
        slice.setAttribute("stroke-width", "5");
        slice.setAttribute("data-index", index);
        slice.style.cursor = "pointer";

        slice.addEventListener("click", function () {
            selectedSlice = index;
            openInputBox(index);
        });

        return slice;
    }

    for (let i = 0; i < numSlices; i++) {
        let slice = createSlice(i);
        pizza.appendChild(slice);
    }

    function openInputBox(index) {
        const inputBox = document.getElementById("input-box");
        document.getElementById("nameInput").value = connections[index]?.name || "";
        document.getElementById("titleInput").value = connections[index]?.title || "";
        document.getElementById("noteInput").value = connections[index]?.note || "";
        document.getElementById("toppingInput").value = connections[index]?.topping || "🍅";
        document.getElementById("linkInput").value = connections[index]?.link || "";
        inputBox.style.display = "block";
    }

    window.submitConnection = function () {
        if (selectedSlice === null) return;

        const name = document.getElementById("nameInput").value.trim();
        const title = document.getElementById("titleInput").value.trim();
        const note = document.getElementById("noteInput").value.trim();
        const topping = document.getElementById("toppingInput").value.trim();
        const link = document.getElementById("linkInput").value.trim();

        connections[selectedSlice] = { name, title, note, topping, link };
        localStorage.setItem("connections", JSON.stringify(connections));

        updateTable();
        document.getElementById("input-box").style.display = "none";
    };

    function updateTable() {
        connectionsTableBody.innerHTML = "";
        Object.keys(connections).forEach(index => {
            let row = `
                <tr>
                    <td>Slice ${parseInt(index) + 1}</td>
                    <td>${connections[index].topping}</td>
                    <td>${connections[index].name}</td>
                    <td>${connections[index].title}</td>
                    <td>${connections[index].note}</td>
                </tr>
            `;
            connectionsTableBody.innerHTML += row;
        });
    }

    updateTable();
});
