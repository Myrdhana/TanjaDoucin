if (!localStorage.getItem('promptSequenceShown')) {
    // Check if user data already exists
    if (!localStorage.getItem("userName") || !localStorage.getItem("userCompany")) {
   // Function to load the navbar dynamically
function loadNavbar() {
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
}

// Ensure the navbar is loaded on each page
loadNavbar();

//Function to load footer dynamically
function loadFooter() {
    fetch('footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        })
        .catch(error => {
            console.error('Error loading footer:', error);
        });
}

//Ensure the footer is loaded on each page
loadFooter();


// Check if the prompt sequence has already been shown
if (!localStorage.getItem('promptSequenceShown')) {
    // Check if user data (name and company) already exists
    if (!localStorage.getItem("userName") || !localStorage.getItem("userCompany")) {
        // Prompt the user for their name
        const userName = prompt("Hello and welcome to my page. I'm Tanja Doucin, and I'd love to share some of my work with you. Could you please tell me your name? (I won't share it)");
        
        // Check if the user entered a name
        if (userName) {
            // Show the second prompt to get the user's company name
            const userCompany = prompt(`Thank you, ${userName}. Could you also share the name of your company?`);
            
            // Check if the user entered a company name
            if (userCompany) {
                // Save the data to localStorage
                localStorage.setItem("userName", userName);
                localStorage.setItem("userCompany", userCompany);
                
                // Show a final thank you alert
                alert(`Thank you, ${userName} from ${userCompany}. I look forward to connecting with you!`);
            } else {
                alert("Thank you for visiting.");
            }
        } else {
            alert("Thank you for visiting.");
        }
        
        // Set the flag to ensure this sequence only runs once
        localStorage.setItem('promptSequenceShown', 'true');
    }
}

// Function to save user data with a timestamp in localStorage
function saveUserDataToStorage(userName, userCompany) {
    const date = new Date().toISOString(); // Get the current date and time in ISO format
    const userData = {
        date: date,
        name: userName,
        company: userCompany
    };

    // Retrieve existing data from localStorage (if any)
    let existingData = JSON.parse(localStorage.getItem('userData')) || [];

    // Add new entry to the data array
    existingData.push(userData);

    // Save the updated data back to localStorage
    localStorage.setItem('userData', JSON.stringify(existingData));
}

// Store user data if both name and company are available
const userName = localStorage.getItem("userName");
const userCompany = localStorage.getItem("userCompany");

if (userName && userCompany) {
    saveUserDataToStorage(userName, userCompany);
} else {
    saveUserDataToStorage("NA", "NA");
}
