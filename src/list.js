window.onload = function() {
    main()
}

function main() {
    
    let myHeaders = new Headers()
    myHeaders.append('Accept', 'application/json')

    let init = {
        method: "GET",
        headers: myHeaders
    }

    let url = 'http://localhost:8080/displaytofavlist'
    
    fetch(url, init)
        .then(response => response.json())
        .then(data => {
            appendData(data)
        })
        .catch(err => {
            console.log(err);
        })
}

function appendData(data) {

    let favlist = document.getElementById("favlist");

    console.log(data)
    
        for (let i = 0; i < data.length; i++) {

           displayData(data[i])
        }
    
}

function displayData(work) {
    let div = document.createElement("div");

    let btn = document.createElement("button");
            
    btn.innerHTML = "delete"
    btn.className = "btns"

    div.innerHTML = '<br>ID: ' + work.workid + '<br>Title: ' + work.titleweb + '<br>Author: ' + work.authorweb;

    div.appendChild(btn);

    favlist.appendChild(div);

    deleteBookfromFavList(btn, work); 
}

//delete selected book from favorite list (requires page refresh)
function deleteBookfromFavList(button, data) {
    button.addEventListener("click", function() {

        //sending json to app
        let init = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }

        let url = "http://localhost:8080/deletefromfavlist"
    
        fetch(url, init)
        .then(response => {
            console.log("Response: ", response.ok)
            console.log("Response status: ", response.status)
             
            button.remove();
        })
        .catch(error => {
            console.log("Client Error " + error)
        });
    })
}

function clearinnerHTML(id) {
    document.getElementById(id).innerHTML = ""
}