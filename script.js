// Check if alert and prompts have already been shown
if 
    (!localStorage.getItem('promptSequenceShown')) 
    
    {
        // Show the first prompt to get the user's name
        
        var userName = prompt("Hello, I'm Tanja Doucin. Could you please tell me your name?");

        // Check if the user entered a name

             if (userName) 
            
                 {
            
                 // Show the second prompt to get the user's company name
        
                 var companyName = prompt("Thank you, " + userName + ". Would you please also tell me the name of your company?");
        
                    // Check if the user entered a company name

                    if (companyName) 
                        
                        {
            
                            // Show the final alert with the user's information
                            
                            alert("Thank you, " + userName + " from " + companyName + ". Welcome to my page!");
                        }
                 }

                                 // Set a flag in localStorage to ensure the prompts and alert are shown only once
                                
                                 localStorage.setItem('promptSequenceShown', 'true');
    }

// Uncomment this line to clear localStorage for testing purposes
// localStorage.clear();
