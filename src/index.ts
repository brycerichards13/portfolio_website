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

document.addEventListener('DOMContentLoaded', function() {
  const sidebarToggle = document.getElementById('button_sidebartoggle');
  const headerContainer = document.getElementById('container_header');
  // Select all the navigation links inside the header
  const navButtons = document.querySelectorAll('#container_header .button_header');

  // Function to close the sidebar
  function closeSidebar() {
    sidebarToggle.classList.remove('opened');
    headerContainer.classList.remove('active');
  }

  // --- Logic for the Hamburger Toggle Button ---
  sidebarToggle.addEventListener('click', function() {
    this.classList.toggle('opened');
    headerContainer.classList.toggle('active');
  });

  // --- FIX: Add click listeners to all nav buttons ---
  // Loop through each navigation button
  navButtons.forEach(button => {
    // When a button is clicked...
    button.addEventListener('click', function() {
      // ...close the sidebar.
      closeSidebar();
    });
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

const cards=document.querySelectorAll('.skill-card');
const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
    if(entry.isIntersecting){
        entry.target.style.opacity=1;
        entry.target.style.transform='translateY(0)';
    }
    });
},{threshold:0.3});

cards.forEach(card=>{
    card.style.opacity=0;
    card.style.transform='translateY(40px)';
    observer.observe(card);
});
  

