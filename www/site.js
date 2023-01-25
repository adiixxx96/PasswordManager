let categoryId = window.localStorage.getItem('categoryId')
let categoryName = window.localStorage.getItem('categoryName')
let siteId = window.localStorage.getItem('siteId')
let passGenerator = document.getElementById('passGenerator')
let addSiteButton = document.getElementById("addSite")
let title = document.getElementsByTagName("h1")[0];

if (siteId == " ") {
    
    //Añadir site nuevo
    addSiteButton.addEventListener("click", (event) => {
    event.preventDefault();
    });
    title.innerText = "Añadir un nuevo site";

    document.getElementById("category").value = categoryName;

    document.getElementById("addSite").onclick = function() {
        var name = document.getElementById("name").value;
        var url = document.getElementById("url").value;
        var user = document.getElementById("user").value;
        var password = document.getElementById("password").value;
        var description = document.getElementById("description").value
        if(name.length == 0 || name.indexOf(" ") == 0) {
            alert('El campo nombre está vacío');
            return;
        } else if (user.length == 0 || user.indexOf(" ") == 0) {
            alert('El campo usuario está vacío');
            return;
        } else if (password.length == 0 || password.indexOf(" ") == 0) {
            alert('El campo contraseña está vacío');
            return;
        } else {
            fetch(`http://localhost:3000/categories/${categoryId}`, {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                name: document.forms.site.name.value,
                url: document.forms.site.url.value,
                user: document.forms.site.user.value,
                password: document.forms.site.password.value,
                description: document.forms.site.description.value
            })
            })
            window.open("index.html")
        return false
        }
    }
} else {

    //Ver site
    addSiteButton.style.display = 'none'
    passGenerator.style.display = 'none'
    title.innerText = "Información de site";

    document.getElementById("category").value = categoryName;

    let name = document.getElementById("name")
    name.disabled=true
    let url = document.getElementById("url")
    url.disabled=true
    let user = document.getElementById("user")
    user.disabled=true
    let password = document.getElementById("password")
    password.disabled=true
    password.setAttribute('type', 'password')
    let description = document.getElementById("description")
    description.disabled=true

    let drawSite = (site) => {
        name.value = site.name;
        url.value = site.url;
        user.value = site.user;
        password.value = site.password;
        description.value = site.description;
    }
    fetch(`http://localhost:3000/sites/${siteId}`)
        .then(response => response.json())
        .then(data => drawSite(data));   
}
function generateRandomPassword(num) {
    const random = Math.random().toString(36).substring(0,num)
    document.getElementById("password").value = random

}



