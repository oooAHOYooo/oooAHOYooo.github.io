const auth0 = await createAuth0Client({
    domain: 'dev-eytb1k2dke7distu.us.auth0.com', // Your Auth0 domain
    client_id: 'IgWr7J24VQax8pAuTmohlQSSUIq8pNSc', // Your Client ID
});

document.getElementById('login').addEventListener('click', async () => {
    await auth0.loginWithRedirect({
        redirect_uri: 'https://ahoy.ooo/ahoyapp/www/index.html',
    });
});

document.getElementById('logout').addEventListener('click', async () => {
    await auth0.logout({
        returnTo: 'https://ahoy.ooo/ahoyapp/www/index.html',
    });
});

window.onload = async () => {
    try {
        // Handle the redirect after login
        await auth0.handleRedirectCallback();
        const user = await auth0.getUser();
        console.log('Logged-in user:', user);

        // Display user information
        document.getElementById('user-info').textContent = `Welcome, ${user.name}`;
    } catch (error) {
        console.error('Error during login:', error);
    }
};

const user = await auth0.getUser();
document.getElementById('user-info').textContent = `Welcome, ${user.name}`;
