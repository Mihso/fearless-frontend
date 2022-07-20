window.addEventListener('DOMContentLoaded', async () => {
    const url = "http://localhost:8000/api/states/";
    try{
        const response = await fetch(url);
        if(!response.ok)
        {
            pass
        }
        else
        {
            
            const data = await response.json();
            console.log(data)
            const selection = document.getElementById('state')
            for( let s of data.states)
            {
                const i = document.createElement('option')
                i.value = s.abbreviation
                i.innerHTML = s.name
                console.log(i)
                selection.appendChild(i)
            }

        }
    }
    catch(e){
        console.log("error", e)
    }

        const formTag = document.getElementById('create-location-form');
        formTag.addEventListener('submit', async event => {
            event.preventDefault();
            const formData = new FormData(formTag);
            const json = JSON.stringify(Object.fromEntries(formData));
            const locationUrl = 'http://localhost:8000/api/locations/';
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