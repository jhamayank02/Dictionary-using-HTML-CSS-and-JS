// Grab all the fields
let find = document.getElementById('find');
let displayDef = document.getElementById('displayDef');
let displayEg = document.getElementById('displayEg');
let searchWord = document.getElementById('searchWord');
let displayError = document.getElementById('displayError');

// Function to fetch data
function getData(myWord) {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', `https://api.dictionaryapi.dev/api/v2/entries/en_US/${myWord}`);

    xhr.onload = function () {
        if (this.status === 200) {
            let mainArray = JSON.parse(this.responseText);
            clear();
            let def;

            for (var i = 0; i < mainArray[0].meanings.length; i++) {
                def = `<li>${mainArray[0].meanings[i].definitions[0].definition}</li>`;
                displayDef.innerHTML += def;
            }

        }
        else {
            clear();
            displayError.innerHTML = "<h3>Some error occured</h3>" + "<h4>check spelling and try again</h4>";
        }
    }
    xhr.send();
}

// function to execute after clicking find meaning button
find.addEventListener('click', () => {
    let myWord = searchWord.value;

    // If entered a word in input field
    if (myWord != '') {
        clear();
        displayDef.innerHTML = `
            <div class="d-flex my-5 justify-content-center">
      <div class="spinner-border text-primary" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div> `;
        getData(myWord);
    }

    // If the input field is blank
    else {
        clear();
        displayError.innerHTML = `<h3>Please a enter a word to search</h3>`;
    }
})

// function to clear display
function clear() {
    displayDef.innerHTML = "";
    displayError.innerHTML = "";
}