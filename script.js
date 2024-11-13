// Check if alert and prompts have already been shown
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
                // Show the final alert with the user's information
                alert("Thank you, " + userName + " from " + userCompany + ". Hope to hear from you soon!");

                // Save user data to localStorage
                localStorage.setItem("userName", userName);
                localStorage.setItem("userCompany", userCompany);
            }
        }
    }

    // Set a flag in localStorage to ensure the prompts and alert are shown only once
    localStorage.setItem('promptSequenceShown', 'true');
}

// Uncomment this line to clear localStorage for testing purposes
// localStorage.clear();
