// Main function to run after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {

    // --- Button to scroll to the top of the page ---
    const toTopButton = document.getElementById('button_totop');
    if (toTopButton) {
        // Click event for scrolling to top
        toTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Sidebar toggle functionality ---
    const sidebarToggle = document.getElementById('button_sidebartoggle');
    const headerContainer = document.getElementById('container_header');
    const navButtons = document.querySelectorAll('#container_header .button_header');

    // Function to close the sidebar
    function closeSidebar() {
        sidebarToggle?.classList.remove('opened');
        headerContainer?.classList.remove('active');
    }

    // Event listener for the hamburger toggle button
    sidebarToggle?.addEventListener('click', function() {
        this.classList.toggle('opened');
        headerContainer?.classList.toggle('active');
    });

    // Add click listeners to all navigation buttons to close the sidebar
    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            closeSidebar();
        });
    });

    // --- Intersection Observer for fade-in animations ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1 // Animation starts when 10% of the element is visible
    });

    // Observe all elements with the class '.container_projects'
    const projectTargets = document.querySelectorAll('.container_projects');
    projectTargets.forEach(target => {
        observer.observe(target);
    });
});