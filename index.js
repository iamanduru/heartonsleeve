function toggleSidebar() {
    // Get the sidebar element
    const sidebar = document.getElementById('sidebar');
    
    // Toggle the 'active' class
    sidebar.classList.toggle('active');
}

// Optional: Close sidebar when clicking outside
document.addEventListener('click', function(event) {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.querySelector('.hamburger__menu');
    
    if (!sidebar.contains(event.target) && !hamburger.contains(event.target) && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
    }
});