window.addEventListener('DOMContentLoaded', async () => {
    const selectTag = document.getElementById('conference');
    const loadingTag = document.getElementById('loading-conference-spinner')
    const url = 'http://localhost:8000/api/conferences/';
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
  
      for (let conference of data.conferences) {
        const option = document.createElement('option');
        option.value = conference.href;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      }

      loadingTag.classList.add('d-none')
      selectTag.classList.remove('d-none')
    }

    const formTag = document.getElementById('create-attendee-form');
    formTag.addEventListener('submit', async event => {
        event.preventDefault();
        const formData = new FormData(formTag);
        const json = JSON.stringify(Object.fromEntries(formData));
        const locationUrl = 'http://localhost:8001/api/attendees/';
        const fetchConfig = {
            method: "post",
            body: json,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const respons = await fetch(locationUrl, fetchConfig);
        if (respons.ok) {
            const alertTag = document.getElementById('success-message')
            formTag.classList.add('d-none')
            alertTag.classList.remove('d-none')
            formTag.reset();
            const newLocation = await respons.json();
            console.log(newLocation);
            }
    });
  
  });