function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

const bgm = document.getElementById('bgm');
const startExperience = () => {
    bgm.play();
    gsap.to("#loading-screen", { opacity: 0, duration: 1, onComplete: () => document.getElementById('loading-screen').style.display = 'none' });
    window.removeEventListener('click', startExperience);
};

window.addEventListener('load', () => {
    gsap.to("#progress-bar", { width: "100%", duration: 2, onComplete: () => {
        document.getElementById('loading-status').innerText = "SYSTEM READY // CLICK TO ENTER";
        window.addEventListener('click', startExperience);
    }});
});

window.addEventListener('mousemove', (e) => {
    gsap.set("#cursor-dot", { x: e.clientX, y: e.clientY });
    gsap.to("#cursor-outline", { x: e.clientX, y: e.clientY, duration: 0.2 });
});

const buttons = document.querySelectorAll('.project-btn, .nav-item, .fb-btn');

buttons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        gsap.to("#cursor-outline", { scale: 2, backgroundColor: "rgba(0, 255, 204, 0.1)", duration: 0.3 });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to("#cursor-outline", { scale: 1, backgroundColor: "transparent", duration: 0.3 });
    });
});

// Add a class .decrypt to your <p> in the Mission Profile
const missionText = document.querySelector('#info p');
const originalText = missionText.innerText;

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            let iteration = 0;
            const interval = setInterval(() => {
                missionText.innerText = originalText.split("")
                    .map((letter, index) => {
                        if(index < iteration) return originalText[index];
                        return String.fromCharCode(65 + Math.floor(Math.random() * 26))
                    }).join("");
                if(iteration >= originalText.length) clearInterval(interval);
                iteration += 1 / 3;
            }, 30);
        }
    });
}, { threshold: 0.5 });

observer.observe(missionText);

const hoverSound = new Audio('path-to-your-click.mp3');
hoverSound.volume = 0.2;

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => hoverSound.play());
});

const panels = document.querySelectorAll('.ui-wrapper');

window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    // Parallax movement for background layers
    gsap.to(".far", { x: (clientX - centerX) * 0.02, y: (clientY - centerY) * 0.02, duration: 1 });
    gsap.to(".mid", { x: (clientX - centerX) * 0.05, y: (clientY - centerY) * 0.05, duration: 1 });

    // 3D Tilt for the active panel
    panels.forEach(panel => {
        const rect = panel.getBoundingClientRect();
        const pX = (clientX - (rect.left + rect.width / 2)) * 0.05;
        const pY = (clientY - (rect.top + rect.height / 2)) * -0.05;
        
        gsap.to(panel, {
            rotationY: pX,
            rotationX: pY,
            ease: "power2.out",
            transformPerspective: 1000,
            duration: 0.5
        });
    });
});

// Ensure you have ScrollTrigger registered if using the full GSAP library
// gsap.registerPlugin(ScrollTrigger); 

document.querySelectorAll('.panel').forEach((panel) => {
    gsap.from(panel.querySelector('.ui-wrapper'), {
        scrollTrigger: {
            trigger: panel,
            start: "top bottom", 
            end: "center center",
            scrub: 1
        },
        y: 100,
        opacity: 0,
        scale: 0.9,
        rotationX: -20
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    // Select all media layers
    document.querySelectorAll('.media-layer').forEach((layer, index) => {
        // Calculate the relative position of the section
        const parent = layer.parentElement;
        const speed = 0.4; // Adjust for more/less parallax
        const yPos = -( (scrolled - parent.offsetTop) * speed);
        
        // Apply vertical parallax
        gsap.to(layer, { y: yPos, duration: 0.1, ease: "none" });
    });
});

// Enhance the Mouse Move logic we built earlier
window.addEventListener('mousemove', (e) => {
    const { clientX, clientY } = e;
    const xPos = (clientX / window.innerWidth - 0.5) * 30; // 30px max movement
    const yPos = (clientY / window.innerHeight - 0.5) * 30;

    gsap.to(".bg-media", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out"
    });
});

// Add this to your IntersectionObserver
const mediaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            const img = entry.target.querySelector('.bg-media');
            if(img) {
                // Flash the image brightness on entry
                gsap.fromTo(img, 
                    { filter: "brightness(2) contrast(2) hue-rotate(90deg)" }, 
                    { filter: "brightness(0.4) contrast(1.2) hue-rotate(0deg)", duration: 0.8 }
                );
            }
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.panel').forEach(section => mediaObserver.observe(section));