let bgList = [];
const main = document.getElementsByTagName("main")[0];

function displayGames(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        let percentageOff = 100 - Math.round(Number(array[i].price)*100/Number(array[i].msrp)) + "% off";
        string += `
        <div class="card">
            <h1 class="title">${array[i].title}</h1>
            <div class="media">
                <img src="${array[i].thumbnail}">
                <div class="percentageOff">${percentageOff}</div>
            </div>
            <div class="info">
                <p class="price">$${array[i].price} <span class="msrp">$${array[i].msrp}</span></p><hr>
                <p class="condition">Condition: ${array[i].condition}</p>
                <p><a href="${array[i].link}" target="_blank">BGG link</a></p>
                ${array[i].info ? `<p class="info">${array[i].info}</p>` : ""}
            </div>
        </div>`
    }
    main.innerHTML = string;
}