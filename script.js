let bgList = [];
const main = document.getElementsByTagName("main")[0];

function displayGames(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        let percentageOff = Math.round(Number(array[i].price)*100/Number(array[i].msrp)) + "%";
        string += `
        <div class="card">
            <div class="media">
                <img src="${array[i].thumbnail}">
                <div class="percentageOff">${percentageOff}</div>
            </div>
            <div class="info">
                <p class="title"><a href="${array[i].link}" target="_blank">${array[i].title}</a></p>
                <p class="price">${array[i].price} <span class="msrp">${array[i].msrp}</span></p>
                <p class="condition">${array[i].condition}</p>
                <p class="info">${array[i].info}</p>
            </div>
        </div>`
    }

    main.innerHTML = string;
}