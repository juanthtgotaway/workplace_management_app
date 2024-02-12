const submitForm = document.getElementById('upEmpBtn');

const editEmp = async (event) => {
    event.preventDefault();

    const selEmpId = document.querySelector('#selUser').value.trim();
    

    const selDepId = document.querySelector('#selDep').value.trim();
    const selAdmin = document.querySelector('#selAdmin').value.trim();

    console.log(selEmpId, selDepId, selAdmin);

    if (!selEmpId) {
        alert('Must select employee to edit');
        return;
    }

    if (selDepId !== "" || selAdmin !== "") {
        const response = await fetch(`/api/user/update/${selEmpId}`, {
            method: 'PUT',
            body: JSON.stringify({
                newDepartmentId: selDepId,
                admin: selAdmin
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/');
            // document.location.replace('/users');
        } else {
            alert('Error in submiting form');
        }
    }
};

submitForm.addEventListener('click', editEmp);