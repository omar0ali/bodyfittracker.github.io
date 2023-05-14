window.addEventListener('load', function () {
    getParts();
});
function getDetailsOf(details) {
    var fieldset = document.getElementById("details");
    fetch('data/'+details+'.json')
        .then(response => response.json())
        .then(data => {
            while (fieldset.firstChild) {
                fieldset.removeChild(fieldset.firstChild);
            }
            const legend = document.createElement('legend');
            legend.innerHTML = "Details";
            fieldset.appendChild(legend);
            data.items.forEach(function (item) {
                fieldset.appendChild(card(item));
            });
        })
        .catch(error => console.error(error));


}
function getParts() {
    var fieldset = document.getElementById("parts");
    while (fieldset.firstChild) {
        fieldset.removeChild(fieldset.firstChild);
    }
    const legend = document.createElement('legend');
    legend.innerHTML = "Anatomy";
    fieldset.appendChild(legend);
    fetch('data/parts.json')
        .then(response => response.json())
        .then(data => {
            // access the items array
            const items = data.items;
            data.items.forEach(function (item) {
                fieldset.appendChild(card(item));
            });
        })
        .catch(error => console.error(error));
}
function card(item) {
    // Create the <a> element
    const a = document.createElement('a');
    a.href = '#';
    a.style = 'text-decoration:none;';
    a.onclick = function () {
        getDetailsOf(item.link);
    }

    // Create the <div> element
    const div = document.createElement('div');
    div.className = 'card';
    if(item.color){
        div.style="border: 1px solid #" + item.color + ";";
    }
    div.style.height = 'auto';
    

    // Create the <img> element
    const img = document.createElement('img');
    img.className = 'image';
    img.src = item.image;
    img.style = 'vertical-align:middle; padding: 10px';

    //this help to remove empty image box if it was not available at the moment.
    img.onerror = function(e) {
        this.parentNode.removeChild(this);
    }

    // Add the card title and description to the <p> element for the card details
    var cardDetails = document.createElement('p');
    cardDetails.className = 'cen';

    // Create the <p> element for the card title
    const cardTitle = document.createElement('strong');
    cardTitle.id = 'card-title';
    cardTitle.innerHTML = item.title;
    if(item.color) {
        cardTitle.style = "color: #"+item.color+";";
    }
   
   

    const description_c = document.createElement('div');
    description_c.innerHTML = item.description;

    cardDetails.appendChild(img);
    cardDetails.appendChild(cardTitle);
    cardDetails.appendChild(description_c);
    // Add the <img> and card details to the <div> element
    
    div.appendChild(cardDetails);

    // Add the <div> element to the <a> element
    a.appendChild(div);
    return a;
}