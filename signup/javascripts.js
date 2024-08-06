document.addEventListener('DOMContentLoaded', () => {
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.querySelector('#navbar');
  
    mobileNavToggle.addEventListener('click', () => {
      navbar.classList.toggle('navbar-mobile');
    });
  
    document.querySelectorAll('.navbar .dropdown > a').forEach(dropDown => {
      dropDown.addEventListener('click', (e) => {
        if (navbar.classList.contains('navbar-mobile')) {
          e.preventDefault();
          dropDown.nextElementSibling.classList.toggle('dropdown-active');
        }
      });
    });
  });