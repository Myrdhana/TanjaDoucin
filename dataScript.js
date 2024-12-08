document.addEventListener("DOMContentLoaded", function() {
    // Get the stored user data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];

    // Get the table body element where data will be inserted
    const dataBody = document.getElementById("dataBody");

    // Check if there's any data stored
    if (storedData.length === 0) {
        // If no data exists, display a message in the table body
        const noDataRow = document.createElement("tr");
        const noDataCell = document.createElement("td");
        noDataCell.colSpan = 3; // Span across all columns
        noDataCell.textContent = "No user data available.";
        noDataRow.appendChild(noDataCell);
        dataBody.appendChild(noDataRow);
    } else {
        // Loop through the stored data and create rows in the table
        storedData.forEach(entry => {
            const row = document.createElement("tr");

            // Create a cell for each piece of data (date, name, company)
            const dateCell = document.createElement("td");
            dateCell.textContent = entry.date;
            row.appendChild(dateCell);

            const nameCell = document.createElement("td");
            nameCell.textContent = entry.name;
            row.appendChild(nameCell);

            const companyCell = document.createElement("td");
            companyCell.textContent = entry.company;
            row.appendChild(companyCell);

            // Append the row to the table body
            dataBody.appendChild(row);
        });
    }
});
