window.onload = function () {
    // Retrieve the stored user data from localStorage
    let userData = JSON.parse(localStorage.getItem('userData')) || [];

    // Sort the data by date in descending order (most recent first)
    userData.sort((a, b) => new Date(b.date) - new Date(a.date));

    const tableBody = document.getElementById('dataBody');
    
    // Loop through the data and create a table row for each entry
    userData.forEach(item => {
        const row = document.createElement('tr');
        
        // Create cells for Date, Name, and Company
        const dateCell = document.createElement('td');
        dateCell.textContent = item.date;
        const nameCell = document.createElement('td');
        nameCell.textContent = item.name;
        const companyCell = document.createElement('td');
        companyCell.textContent = item.company;

        // Append cells to the row
        row.appendChild(dateCell);
        row.appendChild(nameCell);
        row.appendChild(companyCell);

        // Append the row to the table
        tableBody.appendChild(row);
    });
};
