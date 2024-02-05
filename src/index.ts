const toggleButton = document.getElementById('button_sidebartoggle');

function ToggleSidebar() {
    if (toggleButton) {
        let displayStlye = window.getComputedStyle(toggleButton).display;

        if (displayStlye === 'none') {
            return;
        }
        else {
            const containerHeader = document.getElementById('container_header');
            if (containerHeader) {
                containerHeader.classList.toggle('active');
            }
            
            if (containerHeader && containerHeader.classList.contains('active')) {
                document.body.style.overflow = 'hidden'; 
            }
            else {
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

// Attach event listeners to all elements with the class 'button_header'
document.querySelectorAll('.button_header').forEach(function(button) {
    button.addEventListener('click', function() {
        ToggleSidebar();

        if (toggleButton) {
            toggleButton.classList.toggle('opened');
            toggleButton.setAttribute('aria-expanded', toggleButton.classList.contains('opened'))
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

