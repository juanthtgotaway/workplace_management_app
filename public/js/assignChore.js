async function chorePost() {
    var choreData = {};
    var choreForm = new FormData(assignChoreForm);
    choreForm.forEach((value, key) => (choreData[key] = value))


var choreBody = 
{
    "chore_name": choreData.choreData,
    "chore_description": choreData.choreDescription,
    "user_id": choreData.user_id
}

choreBody = JSON.stringify(choreBody);
const newChore = await fetch('/api/chores', {
    method: 'POST',
    mode: 'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
    body: choreBody
});

const choreData = await newChore.json();
return choreData;
}

// submitButton.addEventListener("click", async (event) => {
//     let newChore = {};
//     event.preventDefault();
//     if ()
// })