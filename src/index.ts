const toggleButton = document.getElementById('button_sidebartoggle');

function ToggleSidebar() {
    if (toggleButton) {
        let displayStyle = window.getComputedStyle(toggleButton).display;

        if (displayStyle === 'none') {
            return;
        }

        const containerHeader = document.getElementById('container_header');
        if (containerHeader) {
            containerHeader.classList.toggle('active');

            if (containerHeader.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; 
            } else {
                document.body.style.overflow = 'auto';
            }
        }
    }
}

if (toggleButton) {
    toggleButton.addEventListener('click', function() {
        ToggleSidebar();
    });
}

// Button to scroll to the top of the page
document.addEventListener('DOMContentLoaded', () => {
    const toTopButton = document.getElementById('button_totop');
    if (toTopButton) {
        // Click event for scrolling to top
        toTopButton.addEventListener('click', () => {
            console.log('ToTop button clicked');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

document.querySelectorAll('.button_header').forEach(function(navButton) {
    navButton.addEventListener('click', function() {
        const containerHeader = document.getElementById('container_header'); // The sidebar content element
        const hamburgerButton = document.getElementById('button_sidebartoggle'); // The hamburger icon itself

        // Check if the sidebar (containerHeader) is currently active (i.e., open)
        if (containerHeader && containerHeader.classList.contains('active')) {
            // And if the hamburger button is visible (meaning we are likely in a mobile/sidebar context)
            if (hamburgerButton && window.getComputedStyle(hamburgerButton).display !== 'none') {
                ToggleSidebar(); // This will close the sidebar and set body.style.overflow = 'auto'
            } else if (hamburgerButton && window.getComputedStyle(hamburgerButton).display === 'none') {
                // Desktop context, but containerHeader was 'active'. This is unusual for simple nav.
                // Force remove 'active' and ensure scrolling is enabled.
                containerHeader.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        }

        // After clicking a nav link, ensure the hamburger icon itself is visually set to 'closed'.
        // The hamburger button's inline onclick toggles its state, so if it was open, we need to ensure it's now closed.
        if (hamburgerButton && hamburgerButton.classList.contains('opened')) {
            hamburgerButton.classList.remove('opened');
            hamburgerButton.setAttribute('aria-expanded', 'false');
        }
    });
});

// Fade in animation for projects
document.addEventListener("DOMContentLoaded", (): void => {
    const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
        entries.forEach((entry: IntersectionObserverEntry): void => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1 // Adjust this value based on when you want the animation to start
    });

    // Target elements with the class 'container_project'
    const targets: NodeListOf<Element> = document.querySelectorAll('.container_projects');
    targets.forEach((target: Element): void => {
        observer.observe(target);
    });
});
  

