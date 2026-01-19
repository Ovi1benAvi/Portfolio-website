        function showPage(pageName) {
            // Hide all pages
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            
            // Show selected page
            const selectedPage = document.getElementById(pageName);
            if (selectedPage) {
                selectedPage.classList.add('active');
                window.scrollTo(0, 0);
            }
            
            // Update navigation active state
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
            });
            
            // Set active nav based on page
            if (pageName === 'home' || pageName === 'smartcart' || pageName === 'minyan') {
                document.getElementById('nav-home').classList.add('active');
            } else if (pageName === 'about') {
                document.getElementById('nav-about').classList.add('active');
            } else if (pageName === 'contact') {
                document.getElementById('nav-contact').classList.add('active');
            } else if (pageName === 'cv') {
                document.getElementById('nav-cv').classList.add('active');
            }
        }
        
        function toggleSection(header) {
            const section = header.parentElement;
            section.classList.toggle('expanded');
        }
        
        // Lightbox functions
        function openLightbox(imgSrc) {
            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
        
        function closeLightbox(event) {
            // Close if clicking on background or X button, not on image
            if (event.target.id === 'lightbox' || event.target.classList.contains('lightbox-close')) {
                const lightbox = document.getElementById('lightbox');
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Close lightbox with Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                const lightbox = document.getElementById('lightbox');
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Make all case study images clickable
        document.addEventListener('DOMContentLoaded', function() {
            const caseStudyImages = document.querySelectorAll('.cs-section img, .case-study img');
            caseStudyImages.forEach(function(img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', function() {
                    openLightbox(this.src);
                });
            });
        });
        
        // Slideshow functionality
        let currentSlide = 0;
        const totalSlides = 6;
        
        function updateSlideshow() {
            const slides = document.querySelector('.slideshow-slides');
            const dots = document.querySelectorAll('.slideshow-dot');
            
            if (slides) {
                slides.style.transform = `translateX(-${currentSlide * 100}%)`;
            }
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentSlide);
            });
        }
        
        function changeSlide(direction) {
            currentSlide += direction;
            if (currentSlide < 0) currentSlide = totalSlides - 1;
            if (currentSlide >= totalSlides) currentSlide = 0;
            updateSlideshow();
        }
        
        function goToSlide(index) {
            currentSlide = index;
            updateSlideshow();
        }
        
        // Auto-advance slideshow every 5 seconds
        let slideshowInterval;
        
        function startAutoSlide() {
            slideshowInterval = setInterval(() => {
                changeSlide(1);
            }, 5000);
        }
        
        function stopAutoSlide() {
            clearInterval(slideshowInterval);
        }
        
        // Start auto-slide and pause on hover
        document.addEventListener('DOMContentLoaded', function() {
            const slideshow = document.getElementById('minyan-slideshow');
            if (slideshow) {
                startAutoSlide();
                slideshow.addEventListener('mouseenter', stopAutoSlide);
                slideshow.addEventListener('mouseleave', startAutoSlide);
            }
        });
        
        // Keyboard navigation for slideshow
        document.addEventListener('keydown', function(event) {
            const minyanPage = document.getElementById('minyan');
            if (minyanPage && minyanPage.classList.contains('active')) {
                if (event.key === 'ArrowLeft') {
                    changeSlide(-1);
                } else if (event.key === 'ArrowRight') {
                    changeSlide(1);
                }
            }
        });
