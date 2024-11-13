if (!localStorage.getItem('promptSequenceShown')) {
    // Check if user data already exists
    if (!localStorage.getItem("userName") || !localStorage.getItem("userCompany")) {
        // Prompt the user for their name
        const userName = prompt("Hello and welcome to my page. I'm Tanja Doucin and I want to show you a little of what I'm able to do after only a couple of days of courses. But first, could you please tell me your name?");
        
        // Check if the user entered a name
        if (userName) {
            // Show the second prompt to get the user's company name
            const userCompany = prompt("Thank you, " + userName + ". Would you please also tell me the name of your company?");
            
            // Check if the user entered a company name
            if (userCompany) {
                // Save the data to localStorage
                localStorage.setItem("userName", userName);
                localStorage.setItem("userCompany", userCompany);
                
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
}
// Uncomment this line to clear localStorage for testing purposes
// localStorage.clear();
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

// Save user data after prompt
const userName = prompt("Please enter your name:");
const userCompany = prompt("Please enter your company name:");

if (userName && userCompany) {
    saveUserDataToStorage(userName, userCompany);
}
