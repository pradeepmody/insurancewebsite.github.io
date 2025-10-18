// Insurance Advisor Website - Interactive JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Step 1: Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.replace('fa-bars', 'fa-times');
            } else {
                icon.classList.replace('fa-times', 'fa-bars');
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = navToggle.querySelector('i');
                icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }
    
    // Step 2: Header Background on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(15px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    });
    
    // Step 3: Smooth Scrolling for Navigation Links
    const allNavLinks = document.querySelectorAll('a[href^="#"]');
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Step 4: Form Validation and Submission
    const enquiryForm = document.getElementById('enquiry-form');
    const insuranceTypeSelect = document.getElementById('insurance-type');
    const messageField = document.getElementById('message');
    
    if (enquiryForm) {
        // Show/hide message field based on insurance type
        insuranceTypeSelect.addEventListener('change', function() {
            const messageGroup = messageField.closest('.form-group');
            const messageLabel = messageGroup.querySelector('label');
            
            if (this.value === 'others') {
                messageField.required = true;
                messageLabel.innerHTML = 'Please specify your insurance requirement *';
                messageField.placeholder = 'Please describe the type of insurance you need and your specific requirements...';
                messageGroup.style.display = 'block';
            } else {
                messageField.required = false;
                messageLabel.innerHTML = 'How can I help you?';
                messageField.placeholder = 'Please describe your insurance requirements or any specific questions you have...';
            }
        });
        
        // Form submission handler
        enquiryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                mobile: document.getElementById('mobile').value,
                age: document.getElementById('age').value,
                insuranceType: document.getElementById('insurance-type').value,
                message: document.getElementById('message').value
            };
            
            // Validate form
            if (validateForm(formData)) {
                // Show loading state
                const submitBtn = this.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
                submitBtn.disabled = true;
                
                // Simulate form submission (replace with actual API call)
                setTimeout(() => {
                    showSuccessMessage();
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
        });
    }
    
    // Step 5: Form Validation Function
    function validateForm(data) {
        const errors = [];
        
        // Name validation
        if (!data.name.trim() || data.name.trim().length < 2) {
            errors.push('Please enter a valid full name (minimum 2 characters)');
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            errors.push('Please enter a valid email address');
        }
        
        // Mobile validation (Indian format)
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(data.mobile.replace(/\s+/g, ''))) {
            errors.push('Please enter a valid 10-digit mobile number');
        }
        
        // Age validation
        if (data.age < 18 || data.age > 100) {
            errors.push('Age must be between 18 and 100 years');
        }
        
        // Insurance type validation
        if (!data.insuranceType) {
            errors.push('Please select an insurance type');
        }
        
        // Message validation for "others"
        if (data.insuranceType === 'others' && !data.message.trim()) {
            errors.push('Please specify your insurance requirement');
        }
        
        if (errors.length > 0) {
            showErrorMessage(errors);
            return false;
        }
        
        return true;
    }
    
    // Step 6: Success/Error Message Display
    function showSuccessMessage() {
        const message = document.createElement('div');
        message.className = 'alert alert-success';
        message.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <strong>Thank you!</strong> Your inquiry has been submitted successfully. 
            I'll get back to you within 24 hours with personalized recommendations.
        `;
        
        const form = document.getElementById('enquiry-form');
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => {
            message.remove();
        }, 5000);
        
        // Scroll to success message
        message.scrollIntoView({ behavior: 'smooth' });
    }
    
    function showErrorMessage(errors) {
        const existingAlert = document.querySelector('.alert');
        if (existingAlert) {
            existingAlert.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'alert alert-error';
        message.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <strong>Please correct the following errors:</strong>
            <ul>
                ${errors.map(error => `<li>${error}</li>`).join('')}
            </ul>
        `;
        
        const form = document.getElementById('enquiry-form');
        form.parentNode.insertBefore(message, form);
        
        setTimeout(() => {
            message.remove();
        }, 7000);
        
        // Scroll to error message
        message.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Step 7: Testimonials Slider
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    function showSlide(index) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Remove active class from all dots
        dots.forEach(dot => {
            dot.classList.remove('active');
        });
        
        // Show current slide
        if (slides[index]) {
            slides[index].classList.add('active');
            dots[index].classList.add('active');
        }
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }
    
    // Event listeners for slider controls
    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
    }
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            showSlide(currentSlide);
        });
    });
    
    // Auto-advance testimonials every 5 seconds
    setInterval(nextSlide, 5000);
    
    // Step 8: Animated Counter for Stats
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current) + (target >= 1000 ? '+' : '');
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target + (target >= 1000 ? '+' : '');
            }
        };
        
        updateCounter();
    }
    
    // Step 9: Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate stats when hero section comes into view
                if (entry.target.classList.contains('hero-stats')) {
                    const statNumbers = entry.target.querySelectorAll('.stat-number');
                    animateCounter(statNumbers[0], 500);
                    animateCounter(statNumbers[1], 15);
                    animateCounter(statNumbers[2], 11);
                }
                
                // Animate insurance cards
                if (entry.target.classList.contains('insurance-card')) {
                    entry.target.style.animation = 'fadeInUp 0.6s ease-out';
                }
            }
        });
    }, observerOptions);
    
    // Observe elements
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        observer.observe(heroStats);
    }
    
    const insuranceCards = document.querySelectorAll('.insurance-card');
    insuranceCards.forEach(card => {
        observer.observe(card);
    });
    
    // Step 10: Back to Top Button
    function createBackToTopButton() {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
        backToTopBtn.className = 'back-to-top';
        backToTopBtn.setAttribute('aria-label', 'Back to top');
        
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        document.body.appendChild(backToTopBtn);
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add('show');
            } else {
                backToTopBtn.classList.remove('show');
            }
        });
    }
    
    createBackToTopButton();
    
    // Step 11: Form Field Enhancements
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    
    formInputs.forEach(input => {
        // Add floating label effect
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Check if field has value on load
        if (input.value) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Step 12: Mobile Number Formatting
    const mobileInput = document.getElementById('mobile');
    if (mobileInput) {
        mobileInput.addEventListener('input', function(e) {
            // Remove non-numeric characters
            let value = e.target.value.replace(/\D/g, '');
            
            // Limit to 10 digits
            if (value.length > 10) {
                value = value.slice(0, 10);
            }
            
            // Format as: 98765 43210
            if (value.length > 5) {
                value = value.slice(0, 5) + ' ' + value.slice(5);
            }
            
            e.target.value = value;
        });
    }
    
    // Step 13: Keyboard Navigation Support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
            const icon = navToggle.querySelector('i');
            icon.classList.replace('fa-times', 'fa-bars');
        }
        
        // Arrow keys for testimonial navigation
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    console.log('Insurance Advisor Website JavaScript loaded successfully!');
});

// Step 14: Add CSS for JavaScript-dependent features
const additionalStyles = `
    .nav-menu.show {
        position: fixed;
        top: 70px;
        left: 0;
        width: 100%;
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(15px);
        border-top: 1px solid var(--gray-medium);
        display: flex;
        flex-direction: column;
        padding: var(--spacing-lg);
        gap: var(--spacing-lg);
        box-shadow: var(--shadow-lg);
        z-index: 999;
    }
    
    .alert {
        padding: var(--spacing-lg);
        margin-bottom: var(--spacing-lg);
        border-radius: var(--radius-md);
        display: flex;
        align-items: flex-start;
        gap: var(--spacing-md);
        animation: slideInDown 0.3s ease-out;
    }
    
    .alert-success {
        background: #E8F5E8;
        color: #2E7D32;
        border: 1px solid #4CAF50;
    }
    
    .alert-error {
        background: #FFEBEE;
        color: #C62828;
        border: 1px solid #F44336;
    }
    
    .alert ul {
        margin: 0;
        padding-left: var(--spacing-md);
    }
    
    .alert li {
        margin-bottom: var(--spacing-xs);
    }
    
    .back-to-top {
        position: fixed;
        bottom: var(--spacing-xl);
        right: var(--spacing-xl);
        width: 50px;
        height: 50px;
        background: var(--primary-yellow);
        color: var(--black-primary);
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transform: translateY(20px);
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    }
    
    .back-to-top.show {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        background: var(--yellow-dark);
        transform: translateY(-2px);
    }
    
    .form-group.focused label {
        color: var(--primary-yellow);
        transform: translateY(-2px);
    }
    
    @keyframes slideInDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @media (max-width: 767px) {
        .back-to-top {
            width: 45px;
            height: 45px;
            bottom: var(--spacing-lg);
            right: var(--spacing-lg);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);