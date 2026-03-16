// Custom Cursor Movement
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    // Smooth follower effect
    setTimeout(() => {
        follower.style.left = e.clientX - 12 + 'px';
        follower.style.top = e.clientY - 12 + 'px';
    }, 50);
});

// Scale cursor on hoverable elements
const links = document.querySelectorAll('a, button, .card');
links.forEach(link => {
    link.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(2)';
        follower.style.transform = 'scale(1.5)';
        follower.style.background = 'rgba(0, 210, 255, 0.1)';
    });
    link.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        follower.style.transform = 'scale(1)';
        follower.style.background = 'none';
    });
});

// Scroll reveal animation
const sections = document.querySelectorAll('.section');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = "0";
    section.style.transform = "translateY(50px)";
    section.style.transition = "all 0.8s ease-out";
    observer.observe(section);
});

particlesJS("particles-js", {
  "particles": {
    "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#00d2ff" }, // Your primary blue
    "shape": { "type": "circle" },
    "opacity": { "value": 0.5, "random": false },
    "size": { "value": 3, "random": true },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#0045ff", // Your secondary blue
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "grab" }, // Particles will "grab" your cursor
      "onclick": { "enable": true, "mode": "push" }
    },
    "modes": {
      "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
      "push": { "particles_nb": 4 }
    }
  },
  "retina_detect": true
});

const modal = document.getElementById('hireModal');
const hireBtn = document.querySelector('.hire-btn');
const closeBtn = document.querySelector('.close-modal');

// Open Modal
hireBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('active');
});

// Close Modal
closeBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

// Close if clicking outside the glass box
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});

const nameGlitch = document.querySelector('.glitch');

nameGlitch.addEventListener('mouseenter', () => {
    nameGlitch.style.animationPlayState = 'running';
});

nameGlitch.addEventListener('mouseleave', () => {
    nameGlitch.style.animationPlayState = 'paused';
});

// Add this inside your existing scroll reveal observer or as a new one
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBar = entry.target.querySelector('span');
            const targetWidth = entry.target.getAttribute('data-percent');
            progressBar.style.width = targetWidth;
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-line').forEach(line => {
    skillObserver.observe(line);
});

// 1. Kinetic 3D Tilt Effect
const projects = document.querySelectorAll('[data-tilt]');

projects.forEach(project => {
    project.addEventListener('mousemove', (e) => {
        const { width, height, top, left } = project.getBoundingClientRect();
        const mouseX = e.clientX - left;
        const mouseY = e.clientY - top;

        const tiltX = (mouseY / height - 0.5) * 15; // Max 15 degree tilt
        const tiltY = (mouseX / width - 0.5) * -15;

        // Apply 3D transform on the project-item
        project.style.transform = `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    project.addEventListener('mouseleave', () => {
        // Reset tilt on mouseleave
        project.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
});

// 2. Parallax Background Text (integrate with existing IntersectionObserver)
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Find the background text and shift it on scroll
            const bgText = entry.target.querySelector('.project-bg-text');
            if (bgText) {
                // Slower scroll effect for Z-space perspective
                window.addEventListener('scroll', () => {
                    const scrollValue = window.scrollY;
                    bgText.style.transform = `translateY(calc(-50% + ${scrollValue * 0.15}px)) translateZ(-1px)`;
                });
            }
        }
    });
}, { threshold: 0.1 });

// Ensure sections use the new observer
document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
});

const profileImg = document.querySelector('.profile-img-glow');
const mainCursor = document.querySelector('.cursor');

profileImg.addEventListener('mouseenter', () => {
    // Make cursor smaller and more transparent so it doesn't hide your face
    mainCursor.style.opacity = "0.3";
    follower.style.transform = "scale(2)";
    follower.style.borderColor = "white";
});

profileImg.addEventListener('mouseleave', () => {
    mainCursor.style.opacity = "1";
    follower.style.transform = "scale(1)";
    follower.style.borderColor = "var(--primary)";
});

const infoText = document.querySelector('.typewriter-text');
const textContent = infoText.innerText;
infoText.innerText = ''; // Clear text initially

const infoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let i = 0;
            function typeWriter() {
                if (i < textContent.length) {
                    infoText.innerHTML += textContent.charAt(i);
                    i++;
                    setTimeout(typeWriter, 30); // Speed of typing
                }
            }
            typeWriter();
            infoObserver.unobserve(entry.target); // Run only once
        }
    });
}, { threshold: 0.5 });

infoObserver.observe(document.querySelector('.info-box'));

const skillBars = document.querySelectorAll('.progress-line span');

document.querySelectorAll('.progress-line').forEach(line => {
    observer.observe(line);
});

