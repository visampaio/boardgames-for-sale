let bgList = [];
//let pageList = [];
//let pageNum = 0;
const main = document.getElementsByTagName("main")[0];
const hideDetails = document.getElementById("hideDetails");
const sortOrder = document.getElementById("sortOrder");
const lastDate = document.getElementById("lastDate");

function displayGames() {
    sortList(sortOrder.value);
    //pageList = createPages();

    let array = bgList;
    //document.getElementById("pageNum").textContent = pageNum;
    
    let string = "";
    for (let i = 0; i < array.length; i++) {
        let percentageOff = calcDiscount(array[i]);
        let proxiedUrl = "https://rapid-wind-9e68.viviane-sm3.workers.dev/?url=" + encodeURIComponent(array[i].thumbnail);
        string += `
        <div class="card">
            <div class="media">
                ${array[i].link ? `<a href="${array[i].link}" target="_blank">` : ""}
                    <img src="${proxiedUrl}" crossorigin="anonymous">
                ${array[i].link ? `</a>` : ""}
                ${array[i].msrp ? `<div class="percentageOff">${percentageOff}</div>` : ""}
            </div>
            <h1 class="title">${array[i].title}</h1>
            <div class="cardInfo">
                <p class="price">$${array[i].price} ${array[i].msrp && array[i].msrp !== "OOP" ? `<span class="msrp">$${array[i].msrp}</span>` : ""}</p>
                <div class="details ${hideDetails.checked ? "removed" : ""}"><hr>
                    <p class="condition">Condition: ${array[i].condition}</p>
                    ${array[i].info ? `<p class="info">${array[i].info}</p>` : ""}
                </div>
            </div>
        </div>`
    }
    main.innerHTML = string;
}

//function createPages() {
//    let pages = [];
//    for (let i = 0; i < bgList.length; i+= 25) {
//        pages.push(bgList.slice(i, i + 25));
//    }
//    return pages;
//}

function calcDiscount(array) {
    let discount;
    
    if (array.msrp == "OOP") { discount = "Out of print!"; }
    else { discount = 100 - Math.round(Number(array.price)*100/Number(array.msrp)) + "% off"; }

    return discount;
}

function sortList(order) {
    switch (order) {
        case "discountLtoH":
            bgList.sort((a, b) => parseFloat(a.discount) - parseFloat(b.discount));
            break;
        case "discountHtoL":
            bgList.sort((a, b) => parseFloat(b.discount) - parseFloat(a.discount));
            break;
        case "priceLtoH":
            bgList.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            break;
        case "priceHtoL":
            bgList.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            break;
        case "lastUpdate":
            bgList.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
}

function generateImage() {
    snapdom.toPng(main, {
        backgroundColor: "#fff",
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

sortOrder.addEventListener("change", function() {
    sortList(sortOrder.value);
    //pageNum = 0;
    displayGames(bgList);
    window.scrollTo(0, 0);
});

hideDetails.addEventListener("change", function() {
    const divs = document.querySelectorAll(".details");
    for (let i = 0; i < divs.length; i++) {
        divs[i].classList.toggle("removed");
    }
});

function addDate(rawDate) {
    let date = new Date(rawDate);
    let formatted = date.toLocaleDateString("en-CA", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    return formatted;
}

//document.getElementById("pageUp").addEventListener("click", function() {
//    pageNum == pageList.length ? "" : pageNum++;
//    displayGames();
//    window.scrollTo(0, 0);
//});

//document.getElementById("pageDown").addEventListener("click", function() {
//    pageNum == 0 ? "" : pageNum--;
//    displayGames();
//    window.scrollTo(0, 0);
//});