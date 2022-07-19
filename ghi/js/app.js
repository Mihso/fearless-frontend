function createCard(name, description, pictureUrl, startDate, endDate) {
    return `
    <div class="col">
        <div class="card shadow p-3 mb-5 bg-body rounded">
            <img src="${pictureUrl}" class="card-img-top">
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


window.addEventListener('DOMContentLoaded', async () => {

const url = "http://localhost:8000/api/conferences/";
try {
const response = await fetch(url);
if(!response.ok){

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
            console.log(details)
            const title = details.conference.name;
            const description = details.conference.description;
            const pictureUrl = details.conference.location.picture_url;
            const start = new Date(details.conference.starts).toLocaleDateString();
            const end = new Date(details.conference.ends).toLocaleDateString();
            const html = createCard(title, description, pictureUrl, start, end);
            const column = document.querySelector('.row');
            column.innerHTML += html;

        }
    }

}

}
catch(e){

}

});
