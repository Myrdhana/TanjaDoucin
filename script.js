// Check if prompt has been shown before and user data already exists
if (!localStorage.getItem('promptSequenceShown') && (!localStorage.getItem("userName") || !localStorage.getItem("userCompany"))) {
    // Prompt the user for their name
    const userName = prompt("Hello and welcome to my page. I'm Tanja Doucin, and I'd like to show you some of my work. Could you please tell me your name?");
    
    if (userName) {
        // Show the second prompt to get the user's company name
        const userCompany = prompt("Thank you, " + userName + ". Could you please also tell me the name of your company?");
        
        if (userCompany) {
            // Save the data to localStorage
            localStorage.setItem("userName", userName);
            localStorage.setItem("userCompany", userCompany);

            // Save user data to a list in localStorage for future use
            saveUserDataToStorage(userName, userCompany);

            // Show a final thank you alert
            alert("Thank you, " + userName + " from " + userCompany + ". Hope to hear from you soon!");
        } else {
            alert("You did not provide a company name.");
        }
    } else {
        alert("You did not provide a name.");
    }
    
    // Set the flag to ensure this sequence only runs once
    localStorage.setItem('promptSequenceShown', 'true');
}

// Function to save user data with a timestamp
function saveUserDataToStorage(userName, userCompany) {
    const date = new Date().toISOString(); // Get the current date and time in ISO format

    const userData = { date: date, name: userName, company: userCompany };
    let existingData = JSON.parse(localStorage.getItem('userData')) || [];
    existingData.push(userData);

    localStorage.setItem('userData', JSON.stringify(existingData));
}
