var list = document.getElementById('list');

function displayInfo(L) {
    var allLi = document.querySelectorAll('li');
    allLi.forEach(item => {
        var liDiv = item.querySelector('.infoBody');
        if (!liDiv.hasAttribute('hidden')) {
            liDiv.setAttribute('hidden', '');
        }
    })
    var body = L.querySelector('.infoBody');
    body.removeAttribute('hidden');
    var editBtns = document.querySelectorAll('#editBtn')
    editBtns.forEach(function (btn) {
        if (btn.hasAttribute('hidden')) {
            btn.removeAttribute('hidden');
        }
    });
    const repEditBtns = document.querySelectorAll('.repEditBtns');
    repEditBtns.forEach(function (btn) {
        if (!btn.hasAttribute('hidden')) {
            btn.setAttribute('hidden', '');
        }
    });
}

const updateRepStatusHandler = async (status, id) => {
    // event.preventDefault();
    console.log(status + '  ' + id)



        const response = await fetch(`/api/reports/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                status: status
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/reports');
        } else {
            alert('Error in submiting form');
        }
};


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
    if (choice.matches('#editBtn')) {
        choice.setAttribute('hidden', '');
        choice = choice.parentElement;
        var parId = choice.parentElement.parentElement.id;
        // console.log(parId)
        choice = choice.children[1];
        choice.removeAttribute('hidden');
        console.log(choice);
        // const repEditBtns = document.querySelectorAll('.repEditBtns');
        choice.addEventListener('click', function (event2) {
            var ev = event2.target;
            switch (true) {
                case ev.matches('#pendingBtn'):
                    updateRepStatusHandler('pending', parId);
                    break;

                case ev.matches('#resolveBtn'):
                    updateRepStatusHandler('resolved', parId);
                    break;

                case ev.matches('#closeBtn'):
                    updateRepStatusHandler('closed', parId);
                    break;

                default:
                    break;
            }
        })
    }
});

