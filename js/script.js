// script.js
// ============================================
// DOM Elements
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const skillLevels = document.querySelectorAll('.skill-level');
const stats = document.querySelectorAll('.stat-number');
const typingText = document.querySelector('.typing-text');
const showMoreBtn = document.getElementById('showMoreBtn');
const statValues = document.querySelectorAll('.stat-value');

// ============================================
// Typing Animation
// ============================================
const roles = [
    "Data Analyst",
    "Analytics Specialist",
    "Reporting Analyst",
    "Business Analyst",
    "BI Analyst",
    "Visualization Specialist",
    "Data & Business Analyst",
    "Data Visualization Analyst",
    "Decision Support Analyst"
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;

function typeText() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        // Deleting text
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
    } else {
        // Typing text
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
    }
    
    // If word is complete
    if (!isDeleting && charIndex === currentRole.length) {
        isPaused = true;
        // Pause at the end of typing
        setTimeout(() => {
            isPaused = false;
            isDeleting = true;
        }, 2000);
    }
    
    // If word is deleted
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex++;
        
        // Loop back to the first role
        if (roleIndex === roles.length) {
            roleIndex = 0;
        }
    }
    
    // Set typing speed
    let typingSpeed = isDeleting ? 50 : 100;
    
    // Slow down when pausing at the end of a word
    if (isPaused) {
        typingSpeed = 1000;
    }
    
    setTimeout(typeText, typingSpeed);
}

// Start typing animation
setTimeout(typeText, 1000);

// ============================================
// Mobile Menu Toggle
// ============================================
menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// ============================================
// Projects Filter
// ============================================
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Show all cards first (including hidden ones)
        const allCards = document.querySelectorAll('.project-card');
        allCards.forEach(card => {
            card.style.display = 'flex';
        });
        
        // Filter projects
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || filter === category) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                setTimeout(() => {
                    card.style.display = 'flex';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// ============================================
// Show More Projects
// ============================================
let showAllProjects = false;

if (showMoreBtn) {
    showMoreBtn.addEventListener('click', () => {
        const hiddenCards = document.querySelectorAll('.project-card.hidden');
        
        if (!showAllProjects) {
            // Show all hidden cards
            hiddenCards.forEach(card => {
                card.classList.remove('hidden');
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            });
            
            showMoreBtn.innerHTML = '<i class="fas fa-minus"></i> Show Less Projects';
            showAllProjects = true;
        } else {
            // Hide extra cards (keep only first 6)
            projectCards.forEach((card, index) => {
                if (index >= 6) {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        card.classList.add('hidden');
                    }, 300);
                }
            });
            
            showMoreBtn.innerHTML = '<i class="fas fa-plus"></i> Show More Projects';
            showAllProjects = false;
        }
    });
}

// ============================================
// Animate Skill Bars on Scroll
// ============================================
let skillBarsAnimated = false;

function animateSkillBars() {
    if (skillBarsAnimated) return;
    
    skillLevels.forEach(level => {
        const width = level.getAttribute('data-level') + '%';
        level.style.width = width;
    });
    
    skillBarsAnimated = true;
}

// ============================================
// Animate Stats Counter (Only Once on Load)
// ============================================
let statsAnimated = false;

function animateStats() {
    if (statsAnimated) return;
    
    // Animate hero stats
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
    
    // Animate skill stats in visual
    statValues.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-value'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.floor(current);
            }
        }, 20);
    });
    
    statsAnimated = true;
}

// ============================================
// Scroll Animations
// ============================================
function checkScroll() {
    const skillsSection = document.getElementById('skills');
    const statsSection = document.getElementById('home');
    const projectsSection = document.getElementById('projects');
    
    // Get section positions
    const skillsPos = skillsSection.getBoundingClientRect();
    const statsPos = statsSection.getBoundingClientRect();
    const projectsPos = projectsSection.getBoundingClientRect();
    
    // Check if skills section is in view
    if (skillsPos.top < window.innerHeight - 100) {
        animateSkillBars();
    }
    
    // Check if projects section is in view
    if (projectsPos.top < window.innerHeight - 100) {
        // Add animation to project cards
        const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
        visibleCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// ============================================
// Smooth Scrolling for Navigation Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// Initialize on Load
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for project cards
    projectCards.forEach((card, index) => {
        if (index >= 6) {
            card.classList.add('hidden');
        }
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Set initial state for skill bars
    skillLevels.forEach(level => {
        level.style.width = '0';
    });
    
    // Animate stats immediately on load
    animateStats();
    
    // Check scroll position on load
    checkScroll();
});

// ============================================
// Scroll Event Listener
// ============================================
window.addEventListener('scroll', checkScroll);

// ============================================
// Active Navigation Link on Scroll
// ============================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});