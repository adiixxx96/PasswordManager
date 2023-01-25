
    let drawCategories = (data) => {
        data.forEach((category, index) => {
            let parent = document.getElementsByTagName('ul')[0]
            let child = document.createElement('li')
            child.className='list-group-item'
            child.id = category.id
            child.innerText = category.name
            child.setAttribute('onclick','showSites(this.id)')
            parent.appendChild(child)

            if (index === 0) {
                child.classList.add("actual")
            }
        })
    }
    
    fetch("http://localhost:3000/categories")
        .then(res => res.json())
        .then(data => { drawCategories(data);
        showSites(data[0].id)
    })

    const addCategoryButton = document.getElementById("addCategory")

    addCategoryButton.addEventListener("click", (event) => {
    event.preventDefault();
    });

    //Mostrar sites según la categoría
    function showSites(id) {
        const tabla = document.getElementById('sites');
        tabla.innerHTML=""
        let previousCategory = document.getElementsByClassName("actual")
        for (let element of previousCategory) {
            element.classList.remove("actual")
        }
        let newCategory = document.getElementById(id)
        newCategory.classList.add("actual")
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }

        let drawSites = (data) => {
            data.forEach(site => {
                let tr = document.createElement('tr');
                let name = document.createElement('td');
                let username = document.createElement('td');
                let createdAt = document.createElement('td');
                let actions = document.createElement('td');
                let actionUrl = document.createElement('a');
                    actionUrl.setAttribute('href', site.url)
                    actionUrl.setAttribute('target', '_blank')
                let iconUrl = document.createElement('i')
                    iconUrl.classList.add("fa-solid", "fa-up-right-from-square")
                let actionDelete = document.createElement('i');
                    actionDelete.classList.add("fa-solid", "fa-trash");
                    actionDelete.setAttribute('onclick', `deleteSite(${site.id})`)
                let actionEdit = document.createElement('i');
                actionEdit.classList.add("fa-solid", "fa-pen");
                name.innerText = site.name
                username.innerText = site.user
                createdAt.innerText = site.createdAt
                actionUrl.appendChild(iconUrl);
                actions.appendChild(actionUrl);
                actions.appendChild(actionDelete);
                actions.appendChild(actionEdit);
                tr.appendChild(name)
                tr.appendChild(username)
                tr.appendChild(createdAt)
                tr.appendChild(actions);
                tabla.appendChild(tr)
            })
        }

        fetch(`http://localhost:3000/categories/${id}`)
            .then(response => response.json())
            .then(data => drawSites(data));
        return false
    }

    //Eliminar site
    function deleteSite(id) {
        fetch(`http://localhost:3000/sites/${id}`, {
         method: `DELETE`,
         headers: {
           "Content-type": "application/json"
         }
        }).then(function() {
            window.location.reload();
        });
    }
        
    

    //Añadir categoría
    document.getElementById("addCategory").onclick = function() {
        var name = document.getElementById("name").value;
        if(name.length == 0 || name.indexOf(" ") == 0) { //valida que el nombre no esté vacío o con solamente espacios en blanco
            alert('El campo nombre está vacío');
            return;
        } else {
    
            fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                name: document.forms.category.name.value
            })
        })
        window.location.reload();
        return false
    }
}