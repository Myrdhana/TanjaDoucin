document.addEventListener("DOMContentLoaded", function() {
    const userDataContainer = document.getElementById("userDataContainer");
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];

    if (storedData.length === 0) {
        userDataContainer.textContent = "No user data available.";
    } else {
        const dataList = document.createElement("ul");

        storedData.forEach(entry => {
            const listItem = document.createElement("li");
            listItem.textContent = `Date: ${entry.date}, Name: ${entry.name}, Company: ${entry.company}`;
            dataList.appendChild(listItem);
        });

        userDataContainer.appendChild(dataList);
    }
});
