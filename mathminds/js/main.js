// js/main.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            
            // Animate hamburger to X (optional)
            const bars = document.querySelectorAll('.bar');
            if (navLinks.classList.contains('active')) {
                bars[0].style.transform = 'translateY(8px) rotate(45deg)';
                bars[1].style.opacity = '0';
                bars[2].style.transform = 'translateY(-8px) rotate(-45deg)';
            } else {
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    }

    // Close menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const bars = document.querySelectorAll('.bar');
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        });
    });

    // 2. Sticky Navbar Effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 3. Number Counter Animation for Impact Section
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const animateStats = () => {
        statNumbers.forEach(stat => {
            const target = +stat.getAttribute('data-target');
            const duration = 2000; // ms
            const increment = target / (duration / 16); // 60fps approx
            
            let current = 0;
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Use Intersection Observer to trigger animation when stats are visible
    const statsContainer = document.getElementById('stats-container');
    
    if (statsContainer) {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                animateStats();
            }
        }, { threshold: 0.5 });
        
        observer.observe(statsContainer);
    }

    // 4. Robot Eye Tracking
    const robotHead = document.getElementById('robot-head');
    const pupilLeft = document.getElementById('pupil-left');
    const pupilRight = document.getElementById('pupil-right');
    const svgContainer = document.getElementById('interactive-robot');
    const antennaBulb = document.getElementById('robot-antenna-bulb');

    let isHoveringButtons = false;

    // Optional: make antenna light up when hovering a button
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => isHoveringButtons = true);
        btn.addEventListener('mouseleave', () => isHoveringButtons = false);
    });

    if (robotHead && svgContainer) {
        document.addEventListener('mousemove', (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;
            
            const headRect = svgContainer.getBoundingClientRect();
            // Center of the SVG viewport where the head conceptually is (roughly middle)
            const CenterX = headRect.left + (headRect.width / 2);
            const CenterY = headRect.top + (headRect.height / 2);
            
            const angle = Math.atan2(mouseY - CenterY, mouseX - CenterX);
            
            // Limit the movement
            const distance = Math.min(8, Math.hypot(mouseX - CenterX, mouseY - CenterY) / 100);
            
            const headX = Math.cos(angle) * distance;
            const headY = Math.sin(angle) * distance;

            // Pupils move slightly more
            const pupilDistance = Math.min(5, Math.hypot(mouseX - CenterX, mouseY - CenterY) / 60);
            const pupilX = Math.cos(angle) * pupilDistance;
            const pupilY = Math.sin(angle) * pupilDistance;
            
            robotHead.setAttribute('transform', `translate(${headX}, ${headY})`);
            pupilLeft.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);
            pupilRight.setAttribute('transform', `translate(${pupilX}, ${pupilY})`);

            if (antennaBulb) {
                if (isHoveringButtons) {
                    antennaBulb.setAttribute('fill', '#f43f5e'); // red when active
                } else {
                    antennaBulb.setAttribute('fill', '#F6D365'); // gold default
                }
            }
        });
    }
});
