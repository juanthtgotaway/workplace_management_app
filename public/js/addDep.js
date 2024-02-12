const departmentForm = document.getElementById('departmentForm');

const addDepartmentHandler = async (event) => {
    event.preventDefault();

    const department = document.querySelector('#newdepName').value.trim();
    const manager = document.querySelector('#depManager').value.trim();

    console.log(department, manager);

    if (department && manager) {
        try{
            const response = await fetch('/api/departments', {
                method: 'POST',
                body: JSON.stringify({
                    department_name: department,
                    manager: manager
                }),
                headers: { 'Content-type': 'application/json' },
            });
    
            if(response.ok) {
                document.location.replace('/departments');
            } else {
                alert('Error in submitting form');
            }
        } catch (err) {
            console.log(err);
        }
    }
};

departmentForm.addEventListener('submit', addDepartmentHandler);