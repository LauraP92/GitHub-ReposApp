console.log(window.location.search);
var coll = document.getElementsByClassName("collapsible");

let repoName = "";
let user ="";

function splitRoutes() {
  const route =  window.location.search.replace("?","").trim();
  const params = route.split("&");
  params.forEach(param => {
    const fieldAndValue = param.split("=");
    if(fieldAndValue[0]=="userName"){
      user = fieldAndValue[1]
    }

    if(fieldAndValue[0]=="reposName"){
      repoName = fieldAndValue[1]
    }
    
  });
}
splitRoutes()
console.log(user);
console.log(repoName);


const apiBranch = `https://api.github.com/repos/${user}/${repoName}/branches`;
const apiCommit = `https://api.github.com/repos/${user}/${repoName}/commits`;

fetch(apiBranch)
  .then(response => {
      return response.json();
  })
  .then(data => {
      console.log(data);
  // Set DOM Elem from the API
  for (i=0; i<data.length; i++) {
    $("#table").append(
      `<table>
      <thead>
        <tr>
            <th><h5>Branch name<h5></th>
            </tr>
            </thead>
            <tbody>
            <tr>
            <td>${data[i].name}</td>
            </tr>
            </tbody>
            </table>`);
  }
})


fetch(apiCommit)
  .then(response => {
      return response.json();
  })
  .then(data => {
      console.log(data);
  // Set DOM Elem from the API
  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var tablebody = this.nextElementSibling;
      if (tablebody.style.display === "block") {
        tablebody.style.display = "none";
      } else {
        tablebody.style.display = "block";
      }
  for (i=0; i<data.length; i++) {
  var date = data[i].commit.author.date;
  date = new Date(date);
  var options = { year: 'numeric', month: 'short', day: '2-digit' };
  date = new Intl.DateTimeFormat('en-GB', options).format(date).replace(/ /g, '-');
    $("#tablebody").append(
      `<table>
        <tbody>
        <tr>
          <td><h6><b>Commit</b></h6></td>
          <td><h6><b>Last time updated: </b></h6>${date}</td>
          </tr>
        <tr>
          <td>Author name: ${data[i].commit.author.name}</td>
        </tr>
        <tr>
          <td>Message: ${data[i].commit.message}</td>
        </tr>
      </tbody>
      </table>`);
    }
  });
}
})





