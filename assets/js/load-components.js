//Load Header Component
document.addEventListener('DOMContentLoaded', async () => {
    const header = document.getElementById('header-container');
    if (header) {
        const response = await fetch('/assets/components/header.html');
        header.innerHTML = await response.text();
    }
});
