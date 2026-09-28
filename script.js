let bgList = [];
const main = document.getElementsByTagName("main")[0];

function displayGames(array) {
    let string = "";
    for (let i = 0; i < array.length; i++) {
        let percentageOff = 100 - Math.round(Number(array[i].price)*100/Number(array[i].msrp)) + "% off";
        let proxiedUrl = "https://rapid-wind-9e68.viviane-sm3.workers.dev/?url=" + encodeURIComponent(array[i].thumbnail);
        string += `
        <div class="card">
            <h1 class="title">${array[i].title}</h1>
            <div class="media">
                <img src="${proxiedUrl}" crossorigin="anonymous">
                <div class="percentageOff">${percentageOff}</div>
            </div>
            <div class="info">
                <p class="price">$${array[i].price} <span class="msrp">$${array[i].msrp}</span></p><hr>
                <p class="condition">Condition: ${array[i].condition}</p>
                <p class="link"><a href="${array[i].link}" target="_blank">BGG link</a></p>
                ${array[i].info ? `<p class="info">${array[i].info}</p>` : ""}
            </div>
        </div>`
    }
    main.innerHTML = string;
}

function generateImage() {
    snapdom.toPng(main, {
        backgroundColor: "#fff",
        exclude: [".link"]
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