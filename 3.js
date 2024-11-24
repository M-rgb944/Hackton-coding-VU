// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Image Slider
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    const slideInterval = 5000; // Change slide every 5 seconds

    function nextSlide() {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    // Initialize slider
    setInterval(nextSlide, slideInterval);

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });

    // Form Submissions
    const bookingForm = document.getElementById('booking-form');
    const contactForm = document.getElementById('contact-form');

    bookingForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Booking...';

        // Simulate form submission
        setTimeout(() => {
            alert('Booking submitted successfully! We will contact you shortly.');
            this.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Book Now';
        }, 1500);
    });

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Sending...';

        // Simulate form submission
        setTimeout(() => {
            alert('Message sent successfully! We will get back to you soon.');
            this.reset();
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Send Message';
        }, 1500);
    });

    // Scroll Animation for Elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.service-card, .blog-card, .gallery-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight;
            
            if(elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize elements with opacity 0
    document.querySelectorAll('.service-card, .blog-card, .gallery-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.5s ease-out';
    });

    // Add scroll event listener
    window.addEventListener('scroll', animateOnScroll);
    // Initial check for elements in view
    animateOnScroll();

    // Gallery Image Preview
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const preview = document.createElement('div');
            preview.classList.add('gallery-preview');
            preview.innerHTML = `
                <div class="preview-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="close-preview">&times;</button>
                </div>
            `;
            
            document.body.appendChild(preview);
            document.body.style.overflow = 'hidden';
            
            // Close preview on click
            preview.addEventListener('click', function(e) {
                if(e.target.classList.contains('gallery-preview') || 
                   e.target.classList.contains('close-preview')) {
                    document.body.removeChild(preview);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // Add styles for gallery preview
    const style = document.createElement('style');
    style.textContent = `
        .gallery-preview {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }
        .preview-content {
            position: relative;
            max-width: 90%;
            max-height: 90%;
        }
        .preview-content img {
            max-width: 100%;
            max-height: 90vh;
            object-fit: contain;
        }
        .close-preview {
            position: absolute;
            top: -40px;
            right: 0;
            background: none;
            border: none;
            color: white;
            font-size: 2rem;
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Testimonials Scroll Animation
    const testimonials = document.querySelector('.testimonials-container');
    let isScrolling = false;
    let startX;
    let scrollLeft;

    testimonials.addEventListener('mousedown', (e) => {
        isScrolling = true;
        testimonials.classList.add('active');
        startX = e.pageX - testimonials.offsetLeft;
        scrollLeft = testimonials.scrollLeft;
    });

    testimonials.addEventListener('mouseleave', () => {
        isScrolling = false;
        testimonials.classList.remove('active');
    });

    testimonials.addEventListener('mouseup', () => {
        isScrolling = false;
        testimonials.classList.remove('active');
    });

    testimonials.addEventListener('mousemove', (e) => {
        if(!isScrolling) return;
        e.preventDefault();
        const x = e.pageX - testimonials.offsetLeft;
        const walk = (x - startX) * 2;
        testimonials.scrollLeft = scrollLeft - walk;
    });
});