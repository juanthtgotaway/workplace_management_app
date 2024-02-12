const submitForm = document.getElementById('addRepBtn');

const addReportHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#repTitle').value.trim();
    const content = document.querySelector('#repContent').value.trim();

    console.log(title, content);

    if (title && content) {
        const response = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/reports');
        } else {
            alert('Error in submiting form');
        }
    }
};

submitForm.addEventListener('click', addReportHandler);
