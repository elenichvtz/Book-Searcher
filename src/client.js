window.onload = function() {
    main()
}

function main() {
    document.getElementById('search_btn').addEventListener('click', searchResults)
}

function searchResults() {

    let searchheader = new Headers()
    searchheader.append('Accept', 'application/json')

    let init = {
        method: "GET",
        headers: searchheader
    }

    let user_input = document.getElementById('search').value

    let url = 'https://reststop.randomhouse.com/resources/works?search=' + user_input

    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            appendData(data);
        })
        .catch(err => {
            console.log(err);
        })
}

function appendData(data) {

    clearinnerHTML("output");

    let output = document.getElementById("output");

    if (data.work.length != undefined) {
        for (let i = 0; i < data.work.length; i++) {

            displaySearchData(data.work[i]);
            
        }
    } else {
        displaySearchData(data.work);
    }
}

function clearinnerHTML(id) {
    document.getElementById(id).innerHTML = ""
}

//display the books the search gives back
function displaySearchData(work) {
    let div = document.createElement("div");

    let btn = document.createElement("button");
            
    btn.innerHTML = "add to fav list"
    btn.className = "btns"

    div.innerHTML = '<br>ID: ' + work.workid + '<br>Title: ' + work.titleweb + '<br> Author: ' + work.authorweb  + ' ' + ' ' ;

    div.appendChild(btn);
            
    output.appendChild(div);

    sendJSONtoServer(btn, work);  
}

//add selected book to favorite list
function sendJSONtoServer(button, data) {
    button.addEventListener("click", function() {

        //sending json to app
        let init = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
             },
            body: JSON.stringify(data)
        }

        if(button.innerHTML === "add to fav list") {

            let url = "http://localhost:8080/addtofavlist"
    
            fetch(url, init)
            .then(response => {
                console.log("Response: ", response.ok)
                console.log("Response status: ", response.status)
                        
                button.innerHTML = "undo"
            })
            .catch(error => {
                console.log("Client Error " + error)
            });
        }
        else if(button.innerHTML === "undo") {
            let url = "http://localhost:8080/deletefromfavlist"
    
            fetch(url, init)
            .then(response => {
                console.log("Response: ", response.ok);
                console.log("Response status: ", response.status);;
                        
                button.innerHTML = "add to fav list"
            })
            .catch(error => {
                console.log("Client Error " + error);
            });
        }
    })
}