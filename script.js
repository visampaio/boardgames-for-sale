let bgList = [];
const main = document.getElementsByTagName("main")[0];
const hideDetails = document.getElementById("hideDetails");

function displayGames(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        let percentageOff = calcDiscount(array[i]);
        let proxiedUrl = "https://rapid-wind-9e68.viviane-sm3.workers.dev/?url=" + encodeURIComponent(array[i].thumbnail);
        string += `
        <div class="card">
            <div class="media">
                <img src="${proxiedUrl}" crossorigin="anonymous">
                ${array[i].msrp ? `<div class="percentageOff">${percentageOff}</div>` : ""}
            </div>
            <h1 class="title">${array[i].title}</h1>
            <div class="cardInfo">
                <p class="price">$${array[i].price} ${array[i].msrp && array[i].msrp !== "OOP" ? `<span class="msrp">$${array[i].msrp}</span>` : ""}</p>
                <div class="details ${hideDetails.checked ? "removed" : ""}"><hr>
                    <p class="condition">Condition: ${array[i].condition}</p>
                    <p class="link"><a href="${array[i].link}" target="_blank">BGG link</a></p>
                    ${array[i].info ? `<p class="info">${array[i].info}</p>` : ""}
                </div>
            </div>
        </div>`
    }
    main.innerHTML = string;
}

function calcDiscount(array) {
    let discount;
    
    if (array.msrp == "OOP") { discount = "Out of print!"; }
    else { discount = 100 - Math.round(Number(array.price)*100/Number(array.msrp)) + "% off"; }

    return discount;
}

function generateImage() {
    snapdom.toPng(main, {
        exclude: [".link"],
        excludeMode: "remove",
    }).then(function(img) {
        saveAs(img.src, 'boardgame-sale.png');
    });;
}

// https://stackoverflow.com/a/51478809
function saveAs(uri, filename) {

    var link = document.createElement('a');

    if (typeof link.download === 'string') {

        link.href = uri;
        link.download = filename;

        //Firefox requires the link to be in the body
        document.body.appendChild(link);

        //simulate click
        link.click();

        //remove the link when done
        document.body.removeChild(link);

    } else {

        window.open(uri);

    }
}

hideDetails.addEventListener("change", function() {
    const divs = document.querySelectorAll(".details");
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.toggle("removed");
    }
})