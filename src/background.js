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


//chrome.runtime.onMessage.addListener(handleMessage(data))
//
//chrome.runtime.onConnect.addListener(function(port) {
//    if (port.name === "popup") {
//        console.log("popup")
//        port.onConnect.addListener(function() {
//            console.log("popup has been opened")
//            chrome.runtime.onMessage.addListener(handleMessage(data))
//        });
//
//        port.onDisconnect.addListener(function() {
//            console.log("popup has been closed")
//            chrome.runtime.onMessage.removeListener(handleMessage)
//        });
//    }
//});

//chrome.runtime.onMessage.addListener(handleMessage)

function handleMessage(data)
{
    const { event, lastFivePasswordsList } = data
    switch (event) {
        case 'save':
            handleSave(lastFivePasswordsList);
            break;
        case 'load':
            handleLoad(data);
            break;//
        default:
            break;
    }
    return true;
}

const handleSave = (lastFivePasswordsList) => {
    chrome.storage.local.set({"lastFivePasswords" : lastFivePasswordsList});
    return true;
}

const handleLoad = (data) => {
    //try
    //{
    //    chrome.storage.local.get(["lastFivePasswords"], (result) => {
    //        //console.log(`1. going to send: ${result.lastFivePasswords}`);
    //        chrome.runtime.sendMessage({ event: 'loading', "lastFivePasswordsListLocal": result.lastFivePasswords })
    //    })
    //}
    //catch (e)
    //{
    //    console.log(`Error: ${e}`);
    //}
}