// ===================================
// Navigation Functionality
// ===================================

// Get navigation elements
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const header = document.getElementById('header');

// Toggle mobile menu
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Add shadow to header on scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// ===================================
// Smooth Scrolling
// ===================================

// Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Form Validation & Submission
// ===================================

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

// Form field elements
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phone');
const messageInput = document.getElementById('message');

// Error message elements
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const messageError = document.getElementById('messageError');

// Validation functions
function validateName(name) {
    if (name.trim() === '') {
        return 'Name is required';
    }
    if (name.trim().length < 2) {
        return 'Name must be at least 2 characters';
    }
    return '';
}

function validateEmail(email) {
    if (email.trim() === '') {
        return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }
    return '';
}

function validatePhone(phone) {
    if (phone.trim() === '') {
        return ''; // Phone is optional
    }
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    if (!phoneRegex.test(phone)) {
        return 'Please enter a valid phone number';
    }
    return '';
}

function validateMessage(message) {
    if (message.trim() === '') {
        return 'Message is required';
    }
    if (message.trim().length < 10) {
        return 'Message must be at least 10 characters';
    }
    return '';
}

// Show error message
function showError(input, errorElement, message) {
    errorElement.textContent = message;
    input.classList.add('error');
}

// Clear error message
function clearError(input, errorElement) {
    errorElement.textContent = '';
    input.classList.remove('error');
}

// Real-time validation
if (nameInput) {
    nameInput.addEventListener('blur', () => {
        const error = validateName(nameInput.value);
        if (error) {
            showError(nameInput, nameError, error);
        } else {
            clearError(nameInput, nameError);
        }
    });

    nameInput.addEventListener('input', () => {
        if (nameError.textContent) {
            const error = validateName(nameInput.value);
            if (!error) {
                clearError(nameInput, nameError);
            }
        }
    });
}

if (emailInput) {
    emailInput.addEventListener('blur', () => {
        const error = validateEmail(emailInput.value);
        if (error) {
            showError(emailInput, emailError, error);
        } else {
            clearError(emailInput, emailError);
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailError.textContent) {
            const error = validateEmail(emailInput.value);
            if (!error) {
                clearError(emailInput, emailError);
            }
        }
    });
}

if (phoneInput) {
    phoneInput.addEventListener('blur', () => {
        const error = validatePhone(phoneInput.value);
        if (error) {
            showError(phoneInput, phoneError, error);
        } else {
            clearError(phoneInput, phoneError);
        }
    });

    phoneInput.addEventListener('input', () => {
        if (phoneError.textContent) {
            const error = validatePhone(phoneInput.value);
            if (!error) {
                clearError(phoneInput, phoneError);
            }
        }
    });
}

if (messageInput) {
    messageInput.addEventListener('blur', () => {
        const error = validateMessage(messageInput.value);
        if (error) {
            showError(messageInput, messageError, error);
        } else {
            clearError(messageInput, messageError);
        }
    });

    messageInput.addEventListener('input', () => {
        if (messageError.textContent) {
            const error = validateMessage(messageInput.value);
            if (!error) {
                clearError(messageInput, messageError);
            }
        }
    });
}

// Form submission
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validate all fields
        const nameErr = validateName(nameInput.value);
        const emailErr = validateEmail(emailInput.value);
        const phoneErr = validatePhone(phoneInput.value);
        const messageErr = validateMessage(messageInput.value);

        // Show errors if any
        let hasError = false;

        if (nameErr) {
            showError(nameInput, nameError, nameErr);
            hasError = true;
        } else {
            clearError(nameInput, nameError);
        }

        if (emailErr) {
            showError(emailInput, emailError, emailErr);
            hasError = true;
        } else {
            clearError(emailInput, emailError);
        }

        if (phoneErr) {
            showError(phoneInput, phoneError, phoneErr);
            hasError = true;
        } else {
            clearError(phoneInput, phoneError);
        }

        if (messageErr) {
            showError(messageInput, messageError, messageErr);
            hasError = true;
        } else {
            clearError(messageInput, messageError);
        }

        // If no errors, submit form
        if (!hasError) {
            // Get form data
            const formData = {
                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                package: document.getElementById('package').value,
                message: messageInput.value
            };

            // Log form data (in production, this would be sent to a server)
            console.log('Form submitted:', formData);

            // Show success message
            formSuccess.classList.add('show');

            // Reset form
            contactForm.reset();

            // Hide success message after 5 seconds
            setTimeout(() => {
                formSuccess.classList.remove('show');
            }, 5000);

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            // Scroll to first error
            const firstError = contactForm.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

// ===================================
// Intersection Observer for Animations
// ===================================

// Observe elements for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.package-card, .service-card, .testimonial-card, .about-card'
);

animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(el);
});

// ===================================
// Active Navigation Link Highlighting
// ===================================

// Highlight active section in navigation
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ===================================
// Package Card Click Tracking
// ===================================

// Track package card clicks
const packageCards = document.querySelectorAll('.package-card');

packageCards.forEach(card => {
    const packageName = card.querySelector('.package-name').textContent;
    const ctaButton = card.querySelector('.btn');

    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            console.log(`Package selected: ${packageName}`);
            
            // Pre-fill package selection in contact form
            const packageSelect = document.getElementById('package');
            if (packageSelect) {
                const packageValue = packageName.toLowerCase();
                const option = Array.from(packageSelect.options).find(
                    opt => opt.value === packageValue
                );
                if (option) {
                    packageSelect.value = option.value;
                }
            }
        });
    }
});

// ===================================
// Performance Optimization
// ===================================

// Debounce function for scroll events
function debounce(func, wait = 10) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll handlers
const debouncedHighlight = debounce(highlightNavigation, 10);
window.removeEventListener('scroll', highlightNavigation);
window.addEventListener('scroll', debouncedHighlight);

// ===================================
// Initialize on DOM Load
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('Spinx E-commerce landing page loaded successfully!');
    
    // Initial navigation highlight
    highlightNavigation();
    
    // Add loaded class to body for any CSS animations
    document.body.classList.add('loaded');
});

// ===================================
// Accessibility Enhancements
// ===================================

// Handle keyboard navigation for mobile menu
if (navToggle) {
    navToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navToggle.click();
        }
    });
}

// Trap focus in mobile menu when open
navMenu.addEventListener('keydown', (e) => {
    if (!navMenu.classList.contains('active')) return;
    
    const focusableElements = navMenu.querySelectorAll(
        'a[href], button:not([disabled])'
    );
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
    
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        navToggle.focus();
    }
});
