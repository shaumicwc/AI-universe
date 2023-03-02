// fetch data function
const loadData = async (dataLimit) => {
    const url = 'https://openapi.programming-hero.com/api/ai/tools/'
    const res = await fetch(url);
    const data = await res.json();
    showData(data, dataLimit);
}


// show data function
const showData = (data, dataLimit) => {
    const card = document.getElementById('card');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let dataArray = data.data.tools;
    card.innerHTML = '';

    if (dataLimit && dataArray.length > 6) {
        dataArray = dataArray.slice(0, 6);
        seeMoreBtn.classList.remove('d-none');
    }
    else {
        seeMoreBtn.classList.add('d-none');
    }
    dataArray.forEach(singleData => {
        const singleDataDiv = document.createElement('div');
        singleDataDiv.classList.add('col');
        singleDataDiv.innerHTML = `
        <div class="card">
            <img src=${singleData.image} class="card-img-top " style="height:200px;" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${singleData.features[0]}</li>
                    <li>${singleData.features[1]}</li>
                    <li>${singleData.features[2]}</li>
                </ol>
            </div>
                <hr>
                <div class="d-flex" style="flex-direction:column; width: 100%;">
                <h5 class="mx-3">${singleData.name}</h5>
                <div class="d-flex mx-3 justify-content-between" style="flex-direction:row;">
                <div class="d-flex style="flex-direction:row;">
                <i class="bi bi-calendar-week"></i>
                <p class="mx-2">${singleData.published_in}</p>
                </div>
                <div class="">
                <i class="bi bi-arrow-right text-danger p-3"></i>
                </div>
                </div>
            </div>
        </div>
        `
        card.appendChild(singleDataDiv);

        console.log(singleData)
    });

    // spinner function called
    toggleSpinner(false);
}


// show limited data function
const processSearch = (dataLimit) => {
    toggleSpinner(true);
    loadData(dataLimit);
}

processSearch(6);

document.getElementById('see-more-btn').addEventListener('click', function () {
    processSearch()
});


// toggleSpinner function
function toggleSpinner(isLoading) {
    const spinnerSection = document.getElementById('loader');
    if (isLoading) {
        spinnerSection.classList.remove('d-none')
    }
    else {
        spinnerSection.classList.add('d-none');
    }
}

//modal function

const loadDataDetails = async id =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showDataDetails(data)
}
const showDataDetails = data =>{
    // const dataName = document.getElementById('dataDetailsName');
    const aiFullDetails = document.getElementById('Ai-full-details');
    const aiImageDetails = document.getElementById('Ai-image-details')
    // aiFullDetails.innerText = data.data.name;
    const {features} = data.data;
    const a = Object.values(features)[0].feature_name;
    const b = Object.values(features)[1].feature_name;
    const c = Object.values(features)[2].feature_name;
    aiFullDetails.innerHTML = `
    <p class="fw-bold">${data.data.description}</p>
    <div class="d-flex justify-content-between" style="flex-direction: row;">
    <div class="text-success">${data.data.pricing[0].price}</div>
    <div class="text-warning">${data.data.pricing[1].price}</div>
    <div class="text-danger">${data.data.pricing[2].price}</div>
    </div>
    <div class="d-flex justify-content-between" style="flex-direction: row;">
    <div>
    <p class="fw-bold mt-3">Fetaurs:</p>
    <ol>
        <li>${a}</li>
        <li>${b}</li>
        <li>${c}</li>
    </ol>
    </div>
    <div>
    <p class="fw-bold mt-3">Integrations:</p>
    <ol>
        <li>${data.data.integrations[0]}</li>
        <li>${data.data.integrations[1]}</li>
        <li>${data.data.integrations[2]}</li>
    </ol>
    </div>
    </div>
    `
    aiImageDetails.innerHTML = `
    <img src="${data.data.image_link[0]}" style="height:200px;" alt="">
    <p>${data.data}</p>

    `

    console.log(data.data)
}