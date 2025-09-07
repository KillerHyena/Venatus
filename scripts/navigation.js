// Navigation functionality
function initNavigation() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const header = document.querySelector('.header');
    
    // Mobile menu toggle
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Dropdown menu functionality
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const dropdownLink = dropdown.querySelector('a');
        const dropdownContent = dropdown.querySelector('.dropdown-content');
        
        if (dropdownLink && dropdownContent) {
            // Desktop - show on hover
            dropdown.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) {
                    dropdownContent.style.opacity = '1';
                    dropdownContent.style.visibility = 'visible';
                    dropdownContent.style.transform = 'translateY(0)';
                }
            });
            
            dropdown.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) {
                    dropdownContent.style.opacity = '0';
                    dropdownContent.style.visibility = 'hidden';
                    dropdownContent.style.transform = 'translateY(10px)';
                }
            });
            
            // Mobile - toggle on click
            dropdownLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    
                    // Close other dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                }
            });
        }
    });
    
    // Header scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', debounce(function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            
            // Hide header on scroll down, show on scroll up
            if (window.scrollY > lastScrollY && window.scrollY > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = window.scrollY;
    }, 100));
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mainNav && mainNav.classList.contains('active') && 
            !e.target.closest('.main-nav') && 
            !e.target.closest('.mobile-menu-toggle')) {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });
    
    // Handle window resize
    window.addEventListener('resize', debounce(function() {
        if (window.innerWidth > 768) {
            // Reset mobile menu state on desktop
            if (mobileMenuToggle) mobileMenuToggle.classList.remove('active');
            if (mainNav) mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
            
            // Reset dropdowns
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    }, 250));
}