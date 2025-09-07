// Theme switcher functionality (optional)
function initThemeSwitcher() {
    const themeToggle = document.querySelector('.theme-toggle');
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get current theme from localStorage or system preference
    let currentTheme = localStorage.getItem('theme') || 
                     (prefersDarkScheme.matches ? 'dark' : 'light');
    
    // Apply the current theme
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update toggle button if it exists
    if (themeToggle) {
        themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
    }
    
    // Toggle theme function
    function toggleTheme() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        localStorage.setItem('theme', currentTheme);
        
        if (themeToggle) {
            themeToggle.setAttribute('aria-label', currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
            themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';
        }
    }
    
    // Add event listener to theme toggle button
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    prefersDarkScheme.addListener(e => {
        if (!localStorage.getItem('theme')) {
            currentTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', currentTheme);
        }
    });
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', initThemeSwitcher);