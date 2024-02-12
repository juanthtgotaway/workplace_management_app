var lgoBtn = document.querySelector('#logoutBtn');

const logout = async () => {
    console.log('check1');
    const response = await fetch('api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to log out.');
    }
};

lgoBtn.addEventListener('click', logout);