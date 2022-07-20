function createCard(name, description, pictureUrl, startDate, endDate, location) {
    return `
    <div class="col">
        <div class="card shadow p-3 mb-5 bg-body rounded">
            <img src="${pictureUrl}" class="card-img-top">
            <div class="card-header">
            ${location}
          </div>
            <div class="card-body ">
                <h5 class="card-title" >${name}</h5>
                <p class="card-text">${description}</p>
            </div>
            <div class="card-footer text-muted" type= "date">
                ${startDate} - ${endDate}
            </div>
        </div>
    </div>
    `;
  }

function alerting(html)
{
    return`
    <div class ="col">
    <div class="alert alert-primary" role="alert">
        ${html}
    </div>
    </div>
    `
}

window.addEventListener('DOMContentLoaded', async () => {

const url = "http://localhost:8000/api/conferences/";
try {
const response = await fetch(url);
if(!response.ok){
    // Figure out what to do when the response is bad
    const html = alerting("Not a valid response");
    const column = document.querySelector('.row');
    column.innerHTML += html;
}
else{
    const data = await response.json();

    for (let conference of data.conferences)
    {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if(detailResponse.ok)
        {
            const details = await detailResponse.json();
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const start = new Date(details.conference.starts).toLocaleDateString();
            const end = new Date(details.conference.ends).toLocaleDateString();
            const locate = details.conference.location.name;
            const html = createCard(title, description, pictureUrl, start, end, locate);
            const column = document.querySelector('.row');
            column.innerHTML += html;

        }
    }

}

}
catch(e){
    // Figure out what to do if an error is raised
    const html = alerting("ERROR");
    const column = document.querySelector('.row');
    column.innerHTML += html;
}

});
