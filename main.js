// ===================================
// Navigation Functionality
// ===================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===================================
// Smooth Scroll
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ===================================
// Intersection Observer for Animations
// ===================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animate stats
            if (entry.target.classList.contains('hero-stats')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category, .project-card, .timeline-item, .about-content, .hero-stats').forEach(el => {
    observer.observe(el);
});

// ===================================
// Skill Bar Animation
// ===================================
function animateSkillBars(category) {
    const skillBars = category.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        }, index * 100);
    });
}

// ===================================
// Counter Animation for Stats
// ===================================
function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + '+';
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// ===================================
// Form Handling
// ===================================
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message (you can replace this with actual form submission)
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    
    // Reset form
    contactForm.reset();
    
    // In a real application, you would send this data to a server
    console.log('Form submitted:', data);
});

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #10b981, #059669)' : 'linear-gradient(135deg, #3b82f6, #2563eb)'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 1rem;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        backdrop-filter: blur(10px);
    `;
    
    // Add to document
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }
    
    .notification-icon {
        font-size: 1.25rem;
        font-weight: bold;
    }
    
    .notification-message {
        font-size: 0.95rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// ===================================
// Parallax Effect for Hero Background
// ===================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');
    
    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ===================================
// Typing Effect for Hero Title
// ===================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const titleLine = document.querySelector('.title-line.gradient-text');
//     if (titleLine) {
//         const originalText = titleLine.textContent;
//         typeWriter(titleLine, originalText, 100);
//     }
// });

// ===================================
// Cursor Trail Effect (Optional)
// ===================================
class CursorTrail {
    constructor() {
        this.dots = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }
    
    init() {
        // Create dots
        for (let i = 0; i < 12; i++) {
            const dot = document.createElement('div');
            dot.className = 'cursor-dot';
            dot.style.cssText = `
                position: fixed;
                width: 8px;
                height: 8px;
                background: linear-gradient(135deg, #8b5cf6, #ec4899);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                opacity: ${1 - (i * 0.08)};
                transition: transform 0.1s ease-out;
            `;
            document.body.appendChild(dot);
            this.dots.push({ element: dot, x: 0, y: 0 });
        }
        
        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Animate
        this.animate();
    }
    
    animate() {
        let x = this.mouse.x;
        let y = this.mouse.y;
        
        this.dots.forEach((dot, index) => {
            dot.x += (x - dot.x) * 0.3;
            dot.y += (y - dot.y) * 0.3;
            
            dot.element.style.left = dot.x + 'px';
            dot.element.style.top = dot.y + 'px';
            
            x = dot.x;
            y = dot.y;
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Optional: Uncomment to enable cursor trail (only on desktop)
// if (window.innerWidth > 768) {
//     new CursorTrail();
// }

// ===================================
// Project Card Tilt Effect
// ===================================
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===================================
// Dynamic Year in Footer
// ===================================
const updateFooterYear = () => {
    const footerText = document.querySelector('.footer-text');
    if (footerText) {
        const currentYear = new Date().getFullYear();
        footerText.textContent = `© ${currentYear} Full-Stack Developer. Crafted with passion and code.`;
    }
};

updateFooterYear();

// ===================================
// Lazy Loading for Images
// ===================================
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

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

// Apply debounce to scroll-heavy operations
const debouncedScroll = debounce(() => {
    // Any heavy scroll operations can go here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ===================================
// Console Easter Egg
// ===================================
console.log('%c👋 Hello, Developer!', 'color: #8b5cf6; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Feel free to reach out!', 'color: #06b6d4; font-size: 14px;');
console.log('%c📧 developer@example.com', 'color: #ec4899; font-size: 12px;');

// ===================================
// Initialize
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio loaded successfully! 🚀');
    
    // Add loaded class to body for CSS animations
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        document.querySelectorAll('.hero-text, .hero-visual').forEach(el => {
            el.classList.add('animate');
        });
    }, 100);
});
// ===================================
// ENHANCED JAVASCRIPT - Particle Effects & Advanced Animations
// ===================================

// Particle System for Canvas
class ParticleSystem {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mouse = { x: null, y: null, radius: 150 };
        
        this.init();
    }
    
    init() {
        this.resizeCanvas();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resizeCanvas());
        
        this.canvas.addEventListener('mousemove', (e) => {
            this.mouse.x = e.x;
            this.mouse.y = e.y;
        });
        
        this.canvas.addEventListener('mouseleave', () => {
            this.mouse.x = null;
            this.mouse.y = null;
        });
    }
    
    resizeCanvas() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    createParticles() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                size: Math.random() * 3 + 1,
                speedX: (Math.random() - 0.5) * 0.5,
                speedY: (Math.random() - 0.5) * 0.5,
                color: this.getRandomColor()
            });
        }
    }
    
    getRandomColor() {
        const colors = [
            'rgba(139, 92, 246, 0.5)',   // Purple
            'rgba(6, 182, 212, 0.5)',    // Cyan
            'rgba(236, 72, 153, 0.5)'    // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    connectParticles() {
        for (let i = 0; i < this.particles.length; i++) {
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[i].x - this.particles[j].x;
                const dy = this.particles[i].y - this.particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.strokeStyle = `rgba(139, 92, 246, ${0.2 - distance / 500})`;
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.stroke();
                }
            }
        }
    }
    
    updateParticles() {
        this.particles.forEach(particle => {
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - particle.x;
                const dy = this.mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    const angle = Math.atan2(dy, dx);
                    particle.x -= Math.cos(angle) * force * 2;
                    particle.y -= Math.sin(angle) * force * 2;
                }
            }
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));
        });
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.drawParticles();
        this.connectParticles();
        this.updateParticles();
        requestAnimationFrame(() => this.animate());
    }
}

// AOS-like Scroll Animation
class ScrollAnimations {
    constructor() {
        this.elements = document.querySelectorAll('[data-aos]');
        this.init();
    }
    
    init() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const delay = entry.target.getAttribute('data-aos-delay') || 0;
                    setTimeout(() => {
                        entry.target.classList.add('aos-animate');
                    }, delay);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        this.elements.forEach(el => this.observer.observe(el));
    }
}

// Enhanced Counter Animation
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-count'));
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// 3D Card Tilt Effect
class CardTilt {
    constructor(element) {
        this.element = element;
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 15;
            const rotateY = (centerX - x) / 15;
            
            this.element.style.transform = `
                perspective(1000px) 
                rotateX(${-rotateX}deg) 
                rotateY(${rotateY}deg) 
                scale3d(1.05, 1.05, 1.05)
            `;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    }
}

// Magnetic Button Effect
class MagneticButton {
    constructor(element) {
        this.element = element;
        this.strength = 20;
        this.init();
    }
    
    init() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            const moveX = x / rect.width * this.strength;
            const moveY = y / rect.height * this.strength;
            
            this.element.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
        
        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'translate(0, 0)';
        });
    }
}

// Smooth Reveal on Scroll
class SmoothReveal {
    constructor() {
        this.sections = document.querySelectorAll('section');
        this.init();
    }
    
    init() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1
        });
        
        this.sections.forEach(section => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            observer.observe(section);
        });
    }
}

// Text Scramble Effect
class TextScramble {
    constructor(element) {
        this.element = element;
        this.chars = '!<>-_\\/[]{}—=+*^?#________';
        this.update = this.update.bind(this);
    }
    
    setText(newText) {
        const oldText = this.element.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }
    
    update() {
        let output = '';
        let complete = 0;
        
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        
        this.element.innerHTML = output;
        
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }
    
    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    console.log('%c🚀 Enhanced Portfolio Loaded!', 'color: #8b5cf6; font-size: 20px; font-weight: bold;');
    
    // Initialize Particle System
    if (window.innerWidth > 768) {
        new ParticleSystem('particles-canvas');
    }
    
    // Initialize Scroll Animations
    new ScrollAnimations();
    
    // Initialize Smooth Reveal
    new SmoothReveal();
    
    // Animate Counters when visible
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => statsObserver.observe(stat));
    
    // Initialize 3D Card Tilt
    const codeWindow = document.querySelector('.code-window');
    if (codeWindow) {
        new CardTilt(codeWindow);
    }
    
    // Initialize Magnetic Buttons
    document.querySelectorAll('.btn').forEach(btn => {
        new MagneticButton(btn);
    });
    
    // Parallax Effect for Floating Cards
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        document.querySelectorAll('.floating-card').forEach((card, index) => {
            const speed = 0.3 + (index * 0.1);
            card.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Add typing effect to highlight
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.textContent;
        typingElement.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                typingElement.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }
    
    // Glitch effect on hover
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        glitchElement.addEventListener('mouseenter', () => {
            glitchElement.style.animation = 'none';
            setTimeout(() => {
                glitchElement.style.animation = '';
            }, 10);
        });
    }
    
    // Cursor glow effect
    if (window.innerWidth > 1024) {
        const cursor = document.createElement('div');
        cursor.className = 'cursor-glow';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(139, 92, 246, 0.4), transparent);
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: screen;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });
        
        // Scale cursor on interactive elements
        document.querySelectorAll('a, button, .btn').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
            });
        });
    }
    
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple-animation {
            0% {
                transform: scale(0);
                opacity: 1;
            }
            100% {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .dud {
            color: var(--color-text-muted);
        }
    `;
    document.head.appendChild(style);
    
    // Performance monitoring
    if (window.performance) {
        window.addEventListener('load', () => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #06b6d4; font-size: 14px;');
        });
    }
});

// Export for use in other scripts
window.PortfolioEnhanced = {
    ParticleSystem,
    ScrollAnimations,
    CardTilt,
    MagneticButton,
    TextScramble
};
// ===================================
// 3D CURSOR SYSTEM - Next Level Pointer Animation
// ===================================

class Cursor3D {
    constructor() {
        this.cursorDot = null;
        this.cursorRing = null;
        this.cursorGlow = null;
        this.cursorDepth = null;
        this.cursorMagnetic = null;
        this.cursorLabel = null;
        
        this.mouseX = 0;
        this.mouseY = 0;
        this.currentX = 0;
        this.currentY = 0;
        
        this.trails = [];
        this.maxTrails = 10;
        
        this.init();
    }
    
    init() {
        // Only initialize on desktop
        if (window.innerWidth <= 1024) return;
        
        this.createCursorElements();
        this.attachEventListeners();
        this.animate();
    }
    
    createCursorElements() {
        // Create cursor container
        const container = document.createElement('div');
        container.className = 'custom-cursor';
        document.body.appendChild(container);
        
        // Create cursor dot
        this.cursorDot = document.createElement('div');
        this.cursorDot.className = 'cursor-dot cursor-smooth';
        container.appendChild(this.cursorDot);
        
        // Create cursor ring
        this.cursorRing = document.createElement('div');
        this.cursorRing.className = 'cursor-ring cursor-smooth';
        container.appendChild(this.cursorRing);
        
        // Create cursor glow
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'cursor-glow cursor-smooth';
        container.appendChild(this.cursorGlow);
        
        // Create cursor depth
        this.cursorDepth = document.createElement('div');
        this.cursorDepth.className = 'cursor-depth cursor-smooth';
        container.appendChild(this.cursorDepth);
        
        // Create magnetic indicator
        this.cursorMagnetic = document.createElement('div');
        this.cursorMagnetic.className = 'cursor-magnetic';
        container.appendChild(this.cursorMagnetic);
        
        // Create cursor label
        this.cursorLabel = document.createElement('div');
        this.cursorLabel.className = 'cursor-label';
        container.appendChild(this.cursorLabel);
    }
    
    attachEventListeners() {
        // Mouse move
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Update magnetic indicator position
            this.cursorMagnetic.style.left = e.clientX + 'px';
            this.cursorMagnetic.style.top = e.clientY + 'px';
            
            // Update label position
            this.cursorLabel.style.left = e.clientX + 'px';
            this.cursorLabel.style.top = e.clientY + 'px';
            
            // Create trail
            this.createTrail(e.clientX, e.clientY);
            
            // Random sparkles
            if (Math.random() > 0.95) {
                this.createSparkle(e.clientX, e.clientY);
            }
        });
        
        // Mouse down
        document.addEventListener('mousedown', () => {
            document.body.classList.add('cursor-click');
            this.createRipple(this.mouseX, this.mouseY);
            this.createParticles(this.mouseX, this.mouseY);
        });
        
        // Mouse up
        document.addEventListener('mouseup', () => {
            document.body.classList.remove('cursor-click');
        });
        
        // Hover effects for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .btn, input, textarea, select, .project-card, .skill-category, .tech-icon');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                document.body.classList.add('cursor-hover');
                
                // Label functionality removed for cleaner UX
                // if (el.tagName === 'A' && el.textContent.trim()) {
                //     this.showLabel(el.textContent.trim().substring(0, 20));
                // }
                
                // Magnetic effect for buttons
                if (el.classList.contains('btn')) {
                    document.body.classList.add('cursor-magnetic-active');
                    this.applyMagneticEffect(el);
                }
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-hover');
                document.body.classList.remove('cursor-magnetic-active');
                // this.hideLabel();
                this.removeMagneticEffect(el);
            });
        });
        
        // Text selection cursor
        const textElements = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, li');
        textElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                if (window.getSelection().toString().length === 0) {
                    document.body.classList.add('cursor-text');
                }
            });
            
            el.addEventListener('mouseleave', () => {
                document.body.classList.remove('cursor-text');
            });
        });
    }
    
    animate() {
        // Smooth cursor movement with easing
        const ease = 0.15;
        
        this.currentX += (this.mouseX - this.currentX) * ease;
        this.currentY += (this.mouseY - this.currentY) * ease;
        
        // Update cursor dot position
        this.cursorDot.style.left = this.currentX + 'px';
        this.cursorDot.style.top = this.currentY + 'px';
        
        // Update cursor ring with slight delay
        const ringEase = 0.1;
        const ringX = this.currentX + (this.mouseX - this.currentX) * ringEase;
        const ringY = this.currentY + (this.mouseY - this.currentY) * ringEase;
        
        this.cursorRing.style.left = ringX + 'px';
        this.cursorRing.style.top = ringY + 'px';
        
        // Update glow with more delay for depth
        const glowEase = 0.08;
        const glowX = this.currentX + (this.mouseX - this.currentX) * glowEase;
        const glowY = this.currentY + (this.mouseY - this.currentY) * glowEase;
        
        this.cursorGlow.style.left = glowX + 'px';
        this.cursorGlow.style.top = glowY + 'px';
        
        // Update depth layer
        const depthEase = 0.05;
        const depthX = this.currentX + (this.mouseX - this.currentX) * depthEase;
        const depthY = this.currentY + (this.mouseY - this.currentY) * depthEase;
        
        this.cursorDepth.style.left = depthX + 'px';
        this.cursorDepth.style.top = depthY + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
    
    createTrail(x, y) {
        const trail = document.createElement('div');
        trail.className = 'cursor-trail';
        trail.style.left = x + 'px';
        trail.style.top = y + 'px';
        document.body.appendChild(trail);
        
        this.trails.push(trail);
        
        // Remove old trails
        if (this.trails.length > this.maxTrails) {
            const oldTrail = this.trails.shift();
            oldTrail.remove();
        }
        
        // Fade out and remove
        setTimeout(() => {
            trail.style.opacity = '0';
            setTimeout(() => {
                trail.remove();
                this.trails = this.trails.filter(t => t !== trail);
            }, 300);
        }, 100);
    }
    
    createParticles(x, y) {
        const particleCount = 8;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'cursor-particle';
            
            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 50;
            const offsetX = Math.cos(angle) * velocity;
            const offsetY = Math.sin(angle) * velocity;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.setProperty('--offset-x', offsetX + 'px');
            particle.style.setProperty('--offset-y', offsetY + 'px');
            
            document.body.appendChild(particle);
            
            setTimeout(() => particle.remove(), 1000);
        }
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'cursor-ripple';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        document.body.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
    
    createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.className = 'cursor-sparkle';
        sparkle.style.left = x + (Math.random() * 40 - 20) + 'px';
        sparkle.style.top = y + (Math.random() * 40 - 20) + 'px';
        document.body.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), 800);
    }
    
    showLabel(text) {
        this.cursorLabel.textContent = text;
        document.body.classList.add('cursor-label-active');
    }
    
    hideLabel() {
        document.body.classList.remove('cursor-label-active');
    }
    
    applyMagneticEffect(element) {
        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
            
            if (distance < 100) {
                const strength = (100 - distance) / 100;
                const moveX = deltaX * strength * 0.3;
                const moveY = deltaY * strength * 0.3;
                
                element.style.transform = `translate(${moveX}px, ${moveY}px)`;
            }
        };
        
        element._magneticHandler = handleMouseMove;
        document.addEventListener('mousemove', handleMouseMove);
    }
    
    removeMagneticEffect(element) {
        if (element._magneticHandler) {
            document.removeEventListener('mousemove', element._magneticHandler);
            element.style.transform = '';
        }
    }
}

// Enhanced Particle Animation for Cursor
class CursorParticleSystem {
    constructor() {
        this.particles = [];
        this.maxParticles = 20;
        this.mouseX = 0;
        this.mouseY = 0;
        this.lastX = 0;
        this.lastY = 0;
        
        this.init();
    }
    
    init() {
        if (window.innerWidth <= 1024) return;
        
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
            
            // Calculate velocity
            const dx = this.mouseX - this.lastX;
            const dy = this.mouseY - this.lastY;
            const velocity = Math.sqrt(dx * dx + dy * dy);
            
            // Create particles based on velocity
            if (velocity > 2 && Math.random() > 0.7) {
                this.createParticle();
            }
            
            this.lastX = this.mouseX;
            this.lastY = this.mouseY;
        });
        
        this.animate();
    }
    
    createParticle() {
        if (this.particles.length >= this.maxParticles) {
            const oldParticle = this.particles.shift();
            if (oldParticle.element) {
                oldParticle.element.remove();
            }
        }
        
        const particle = {
            x: this.mouseX,
            y: this.mouseY,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1,
            element: null
        };
        
        const el = document.createElement('div');
        el.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: linear-gradient(135deg, #8b5cf6, #06b6d4);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9990;
            left: ${particle.x}px;
            top: ${particle.y}px;
            transform: translate(-50%, -50%);
        `;
        
        document.body.appendChild(el);
        particle.element = el;
        this.particles.push(particle);
    }
    
    animate() {
        this.particles.forEach((particle, index) => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.life -= 0.02;
            particle.vy += 0.1; // Gravity
            
            if (particle.element) {
                particle.element.style.left = particle.x + 'px';
                particle.element.style.top = particle.y + 'px';
                particle.element.style.opacity = particle.life;
                
                if (particle.life <= 0) {
                    particle.element.remove();
                    this.particles.splice(index, 1);
                }
            }
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 1024) {
        console.log('%c🎯 3D Cursor System Activated!', 'color: #8b5cf6; font-size: 16px; font-weight: bold;');
        new Cursor3D();
        new CursorParticleSystem();
    }
});

// Export for external use
window.Cursor3D = Cursor3D;
window.CursorParticleSystem = CursorParticleSystem;
