window.onload = function() {
    document.getElementById("addButton").onclick = function() {
        fetch("http://localhost:3000/categories", {
            method: 'POST',
            headers: {
                "Content-type":"application/json"
            },
            body: JSON.stringify({
                name: document.forms.data.name.value
            })
        })
        return false
    }    
}