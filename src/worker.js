function copyText() 
{
    // Get the text field
    var copyText = document.getElementById("text-display");
  
    // Select the text field
    copyText.select();
    copyText.setSelectionRange(0, 99999); // For mobile devices
  
     // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value);
  
    // Alert the copied text
    //alert("Copied the text: " + copyText.value);
}

function getPassword() 
{
    const request = "https://password.ninja/api/password?animals=true&instruments=true&colours=true&shapes=true&food=true&sports=true&transport=true&symbols=true&capitals=true&lettersForNumbers=100"
    const textDisplay = document.getElementById('text-display');

    //current issue: making a request with fetch returns 2 Access Control Allow Origin
    fetch(request)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        console.log(response)
        return response.json();
    })
    .then(data => {
        // Display data in an HTML element
        console.log(data);
        textDisplay.textContent = JSON.stringify(data, null, 2);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}