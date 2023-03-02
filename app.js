// fetch data function
const loadData = async (dataLimit) =>{
    const url = 'https://openapi.programming-hero.com/api/ai/tools/'
    const res = await fetch(url);
    const data = await res.json();
    showData(data, dataLimit);
}


// show data function
const showData = (data, dataLimit) =>{
    const card = document.getElementById('card');
    const seeMoreBtn = document.getElementById('see-more-btn');
    let dataArray = data.data.tools;
    card.innerHTML = '';

    if(dataLimit && dataArray.length > 6){
        dataArray = dataArray.slice(0, 6);
        seeMoreBtn.classList.remove('d-none');
       }
        else{
            seeMoreBtn.classList.add('d-none');
       }
    dataArray.forEach(singleData => {
        const singleDataDiv = document.createElement('div');
        singleDataDiv.classList.add('col');
        singleDataDiv.innerHTML = `
        <div class="card">
            <img src=${singleData.image} class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">Features</h5>
                <ol>
                    <li>${singleData.features[0]}</li>
                    <li>${singleData.features[1]}</li>
                    <li>${singleData.features[2]}</li>
                </ol>
            </div>
                <hr>
            <div class="d-flex justify-content-between">
            <h5 class="mx-3">${singleData.name}</h5>
                <p></p>
                <i class="bi bi-arrow-right text-danger p-3"></i>
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
const processSearch = (dataLimit) =>{
    toggleSpinner(true); 
    loadData(dataLimit);
}

processSearch(6);

document.getElementById('see-more-btn').addEventListener('click', function(){
    processSearch()
});


// toggleSpinner function
function toggleSpinner(isLoading){
    const spinnerSection = document.getElementById('loader');
    if(isLoading){
        spinnerSection.classList.remove('d-none')
    }
    else{
        spinnerSection.classList.add('d-none');
    }
}