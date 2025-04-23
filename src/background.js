//let data = {
//    "event" : "load/save",
//    "lastFivePasswords": [
//        "password1",
//        "password2",
//        "password3",
//        "password4",
//        "password5"
//    ]
//}

chrome.runtime.onMessage.addListener(data => {
    const { event, lastFivePasswordsList } = data
    console.log(`in background, ${event}`);
    switch (event) {
        case 'save':
            handleSave(lastFivePasswordsList);
            break;
        case 'load':
            handleLoad(data);
            break;
        default:
            break;
    }
})

const handleSave = (lastFivePasswordsList) => {
    console.log(`passwords received: ${lastFivePasswordsList}`)
    //console.log(`typeof: ${typeof(lastFivePasswords)}`)
    //console.log(`typeof: ${typeof(lastFivePasswords[0])}`)
    chrome.storage.local.set({"lastFivePasswords" : lastFivePasswordsList});
    chrome.storage.local.get(["lastFivePasswords"], function(result) {
        console.log(`stored as: ${result.lastFivePasswords}`)
    })
}

const handleLoad = (data) => {
    try
    {
        chrome.storage.local.get(["lastFivePasswords"], (result) => {
//
        //    console.log(`successfully found these passwords on browser: ${lastFivePasswords}`)
//
        //    sendResponse(lastFivePasswords);
        //    return true;
            console.log(`1. going to send: ${result.lastFivePasswords}`);
            chrome.runtime.sendMessage({ event: 'loading', "lastFivePasswordsListLocal": result.lastFivePasswords })
        })
    }
    catch (e)
    {
        console.log(`Error: ${e}`);
    }
}