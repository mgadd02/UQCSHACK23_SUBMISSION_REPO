// content.js

URL_VAR = "https://MaxG02.pythonanywhere.com";

// Run on scroll
function getVideoInfo() {
    // Get all the regular video divs
    const videos = document.getElementsByTagName('ytd-rich-grid-media');

    var video_info = {};
    // Set list to empty of urls to send
    var sendUrlList = [];
    for (const videoDiv of videos) {
        const title = videoDiv.querySelector("#video-title");
        const link = videoDiv.querySelector("#video-title-link");
        if (urlCompletedExists(link)) {
            continue;
        } else {
            // Add it to be processed
            addSendUrlList(link);
            // But for now just make the change here, although it normally isn't made at this point
            // (This would likely end up happening async i.e. once they are returned)
            //title.textContent = title.textContent + "!"; //for example add an exclaimation mark
            //link.style.backgroundColor = '#FFC0CB'; //also change colour to make changes easy to see
            addCompletedUrl(link);
            console.log(title);
        }        
    };
    
    //
    // NEED TO SEND THE LIST TO GET PROCESSED HERE
    //

    sendReceiveData(video_info);

    // Remove all shorts
    const shorts = document.getElementsByTagName('ytd-rich-section-renderer');
    for (const element of shorts) {
        var child = element.lastElementChild; 
        while (child) {
            element.removeChild(child);
            child = element.lastElementChild;
        }
    }

};

// Define a debounced version of the function with a specified delay (e.g., 500ms)
function debounce(func, delay) {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(func, delay);
    };
}

// send and recieve data
async function sendReceiveData(data) {
    const payload = "balls";

    try {
        const response = await fetch(URL_VAR, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        if (response.ok) {
            const dataReply = await response.json();
            console.log(dataReply);
        } else {
            console.error("Request failed:", response.statusText);
        }
    } catch (error) {
        console.error("Request error:", error);
    }
}

// Create a debounced version of myFunction
const debouncedMyFunction = debounce(getVideoInfo, 500);

// Attach the debounced function to the scroll event
window.addEventListener('scroll', debouncedMyFunction);

// Run on page load as well (then otherwise update on scroll)
window.onload = getVideoInfo;


// IMPORTANT!!!!
// Likely should change the updating methodology by keeping a list of calculated titles etc.
// Otherwise may be very costly to run (lots of constant processing required)

// Create an empty array to store URLs
var urlCompletedList = [];

// Function to add a URL to the list
function addCompletedUrl(url) {
  urlCompletedList.push(url);
}

// Function to check if a URL exists in the list
function urlCompletedExists(url) {
    return urlCompletedList.includes(url);
}

// Create an empty array to store URLs
var sendUrlList = [];

// Function to add a URL to the list
function addSendUrlList(url) {
    sendUrlList.push(url);
}

// Function to check if a URL exists in the list
function sendUrlListExists(url) {
    return sendUrlList.includes(url);
}