const searchUser = document.querySelector(".GitHubuser");
const searchBtn = document.querySelector("#searchbutton");
const searchStarsAsc = document.querySelector("#searchstarsasc");
const searchStarsDesc = document.querySelector("#searchstarsdesc");
const inputField = document.querySelector("#icon_prefix");

// Function- don't allow to insert spaces
$(function () {
    $('#icon_prefix').on('keypress', function (e) {
        if (e.which == 32)
            return false;
    });
});


// Function- alert to complete the "Username" field
$('#searchbutton').click(function () {
    if (!document.getElementById('icon_prefix').value) {
        alert('Please fill in the "Username" field');
    }
});
$('#searchStarsAsc').click(function () {
    if (!document.getElementById('icon_prefix').value) {
        alert('Please fill in the "Username" field');
    }
});
$('#searchStarsDesc').click(function () {
    if (!document.getElementById('icon_prefix').value) {
        alert('Please fill in the "Username" field');
    }
});

// Find repository button
searchBtn.addEventListener("click", () => {
    $("#ulBox").empty();
    const api = `https://api.github.com/users/${searchUser.value}/repos`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Set DOM Elem from the API
            appendItems(data);
        })
});


// Sort repository by stars-asc
searchStarsAsc.addEventListener("click", () => {
    $("#ulBox").empty();
    const api = `https://api.github.com/users/${searchUser.value}/repos`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Set DOM Elem from the API
            data.sort(((a, b) => a.stargazers_count - b.stargazers_count));
            appendItems(data);
        })
})


// Sort repository by stars-desc
searchStarsDesc.addEventListener("click", () => {
    $("#ulBox").empty();
    const api = `https://api.github.com/users/${searchUser.value}/repos`;
    fetch(api)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data);
            // Set DOM Elem from the API
            data.sort(((a, b) => b.stargazers_count - a.stargazers_count));
            appendItems(data);
        })
})

function appendItems(data) {
    for (i = 0; i < data.length; i++) {
        $("#ulBox").append(
            `<ul class="collection"> 
            <li class="collection-item"><i class="material-icons">event_note</i><span id="reposname">Repository name:${data[i].name}</span><a href="branch.html?userName=${searchUser.value}&reposName=${data[i].name}" class="button"><button id="showbranch" class="btn waves-effect waves-light" type="submit">Show branch</button></a></li>
            <li class="collection-item"><i class="material-icons">description</i><span id="description">Description:${data[i].description}</span></li>
            <li class="collection-item"><i class="material-icons">star_border</i><span id="stars">Stars:${data[i].stargazers_count}</span></li> 
            <li class="collection-item"><i class="material-icons">group</i><span id="watches">Watches:${data[i].watchers_count}</span></li> 
            <li class="collection-item"><i class="material-icons">system_update_alt</i><span id="lastupdate">Last update:${data[i].updated_at}</span></li>
            </ul>`);
    }
}