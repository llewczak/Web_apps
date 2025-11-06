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

document.getElementById("filterText").addEventListener("input", function (){
   const searchText = this.value.toLowerCase();
   const filtered = allData.filter(item => item.title.toLowerCase().includes(searchText));
   renderTable(filtered);
});

document.getElementById("filterSelect").addEventListener("change", function () {
   const option = this.value;
   let sorted = [...allData];
   if (option==="descending") sorted.sort((a, b) => b.title.localeCompare(a.title));
   if (option==="ascending") sorted.sort((a, b) => a.title.localeCompare(b.title));
   renderTable(sorted);
});

window.addEventListener("DOMContentLoaded", loadData);