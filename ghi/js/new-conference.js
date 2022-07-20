window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/locations/";
    try{
        const response = await fetch(url);
        if(!response.ok)
        {
            pass
        }
        else
        {     
            const data = await response.json();
            
            const selection = document.getElementById('Location')
            for( let c of data.locations)
            {
                const i = document.createElement('option')
                i.value = c.id
                i.innerHTML = c.name
                selection.appendChild(i)
            }

        }
    }
    catch(e){
        console.log("error", e)
    }

        const formTag = document.getElementById('create-conference-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const locationUrl = 'http://localhost:8000/api/conferences/';
            const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
            };
            const response = await fetch(locationUrl, fetchConfig);
            if (response.ok) {
            formTag.reset();
            const newLocation = await response.json();
            console.log(newLocation);
            }
        });
});