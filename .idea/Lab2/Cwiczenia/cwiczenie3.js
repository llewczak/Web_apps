let allData = []

async function loadData() {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    allData = data.products.slice(0, 30);
    renderTable(allData);
}

function renderTable(data) {
    let table = "<table border='1'><tr>";
    let columns = ["title", "description", "images"];

    columns.forEach(header => table += `<th>${header}</th>`);
    table += "</tr>";

    data.forEach(row => {
        table += "<tr>";
        columns.forEach(header => {
            if (header != "images") table += `<td>${row[header]}</td>`;
            else table += `<td><img src=${row[header][0]}></td>`
        });
        table += "</tr>";
    });

    table += "</table>";

    document.getElementById("tableContainer").innerHTML = table;
}

function search(value) {
    const searchText = value.toLowerCase();
    const filtered = allData.filter(item => item.title.toLowerCase().includes(searchText));
    filter(filtered, document.getElementById("filterSelect").value);
};

function filter(data, value) {
    const option = value;
    let sorted = [...data];
    if (option === "descending") sorted.sort((a, b) => b.title.localeCompare(a.title));
    if (option === "ascending") sorted.sort((a, b) => a.title.localeCompare(b.title));
    renderTable(sorted);
}

document.getElementById("filterSelect").addEventListener("change", function () {
    search(document.getElementById("filterText").value);
});

document.getElementById("filterText").addEventListener("input", function () {
    search(this.value);
});

window.addEventListener("DOMContentLoaded", loadData);