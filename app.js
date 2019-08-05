const url = 'https://randomuser.me/api/';

// Add event listner to button that handles the fetch request and updates the user card
document.querySelector('#btn').addEventListener('click', () => {
    fetch(url)
        .then(handleErrors)
        .then(parseJSON)
        .then(updateProfile)
        .catch(printError)
});

// Handle if there is an error during the fetch 
function handleErrors(response) {
    // If the response is not OK, throw an error
    if (!response.ok) {
        // Throwing error short circuits the function and moves on to .catch
        throw Error(response.status);
    }
    // If there is no error, return the response so that the next .then has something to use
    return response;
}

/*  PARSE RESPONSE TO JSON
    Parsing could take a while, so this is returned as a promise.
    When it's done it passes the value to the next .then block */
function parseJSON(response) {
    return response.json();
}

// UPDATE THE PROFILE CARD
function updateProfile(json) {
    // Extract the information we want
    let userData = json.results[0];
    let name = `${userData.name.first} ${userData.name.last}`;
    let username = userData.login.username;
    let email = userData.email;
    let city = userData.location.city;
    let photo = userData.picture.medium;

    // Update the profile card 
    document.querySelector('#fullname').innerText = name;
    document.querySelector('#username').innerText = username;
    document.querySelector('#email').innerText = email;
    document.querySelector('#city').innerText = city;
    document.querySelector('#avatar').setAttribute('src', photo);
}

function printError(error) {
    console.log(error);
}
