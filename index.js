const hamburgerMenu = document.getElementById('hamburger__menu');
const sidebar = document.getElementById('sidebar');

hamburgerMenu.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});