var list = document.getElementById('list');

function displayInfo(L) {
    var allLi = document.querySelectorAll('li');
    allLi.forEach(item => {
        var liDiv = item.querySelector('.infoBody');
        if (!liDiv.hasAttribute('hidden')){
            liDiv.setAttribute('hidden', '');
        }
    })
    var body = L.querySelector('.infoBody');
    body.removeAttribute('hidden')
}





list.addEventListener("click", function (event) {
    var choice = event.target;

    if (choice.matches("h1")) {
        choice = choice.parentElement;
    }
    if (choice.matches("div")) {
        choice = choice.parentElement;
    }

    if (choice.matches("li")) {
        displayInfo(choice);
    }
});