// Post interactions and animations
function initPostInteractions() {
    // Add hover effect to post cards
    const postCards = document.querySelectorAll('.post-card');
    
    postCards.forEach(card => {
        // Mouseenter event
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-active');
            
            // Add subtle tilt effect
            this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
        });
        
        // Mouseleave event
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-active');
            
            // Remove tilt effect
            this.style.transform = '';
        });
        
        // Mousemove effect for subtle tilt
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth > 768) {
                const cardRect = this.getBoundingClientRect();
                const x = e.clientX - cardRect.left;
                const y = e.clientY - cardRect.top;
                
                const centerX = cardRect.width / 2;
                const centerY = cardRect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            }
        });
    });
    
    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img[data-src]');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    
                    if (img.dataset.srcset) {
                        img.srcset = img.dataset.srcset;
                    }
                    
                    img.classList.remove('lazy');
                    img.classList.add('fade-in');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '0px 0px 100px 0px'
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers without IntersectionObserver
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            if (img.dataset.srcset) {
                img.srcset = img.dataset.srcset;
            }
        });
    }
    
    // Reading progress bar (if implemented in HTML)
    const progressBar = document.querySelector('.reading-progress');
    
    if (progressBar) {
        window.addEventListener('scroll', throttle(function() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            const progress = (scrollTop / (documentHeight - windowHeight)) * 100;
            progressBar.style.width = progress + '%';
        }, 100));
    }
    
    // Like button functionality (if implemented)
    const likeButtons = document.querySelectorAll('.like-btn');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('liked');
            
            const likesCount = this.querySelector('.likes-count');
            if (likesCount) {
                let count = parseInt(likesCount.textContent);
                count = this.classList.contains('liked') ? count + 1 : count - 1;
                likesCount.textContent = count;
            }
            
            // Add animation effect
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Social share buttons (if implemented)
    const shareButtons = document.querySelectorAll('.share-btn');
    
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            const url = this.dataset.url || window.location.href;
            const title = this.dataset.title || document.title;
            
            if (navigator.share) {
                navigator.share({
                    title: title,
                    url: url
                }).catch(console.error);
            } else {
                // Fallback for browsers that don't support Web Share API
                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
            }
        });
    });
}