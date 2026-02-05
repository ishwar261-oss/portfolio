// ===========================
// 1. AOS Animations
// ===========================
AOS.init({ duration: 1000, offset: 120, once: false });

// ===========================
// 2. Typing Effect for Name
// ===========================
const typingElement = document.getElementById('typing-text');
const words = ["Software Engineer", "AI Developer"];
let wordIdx = 0, charIdx = 0;

function typeEffect() {
    if (charIdx < words[wordIdx].length) {
        typingElement.textContent += words[wordIdx][charIdx];
        charIdx++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 2000);
    }
}

function eraseEffect() {
    if (charIdx > 0) {
        typingElement.textContent = words[wordIdx].substring(0, charIdx - 1);
        charIdx--;
        setTimeout(eraseEffect, 50);
    } else {
        wordIdx = (wordIdx + 1) % words.length;
        setTimeout(typeEffect, 500);
    }
}

// ===========================
// 3. Animated Hero Subtitle
// ===========================
const subtitle = document.querySelector('.subtitle');
const subWords = ["Transforming ideas into intelligent systems", "Building Tomorrow’s Technology"];
let subIdx = 0, subChar = 0;

function typeSubtitle() {
    if (subChar < subWords[subIdx].length) {
        subtitle.textContent = subWords[subIdx].substring(0, subChar + 1);
        subChar++;
        setTimeout(typeSubtitle, 80);
    } else {
        setTimeout(eraseSubtitle, 2000);
    }
}

function eraseSubtitle() {
    if (subChar > 0) {
        subtitle.textContent = subWords[subIdx].substring(0, subChar - 1);
        subChar--;
        setTimeout(eraseSubtitle, 40);
    } else {
        subIdx = (subIdx + 1) % subWords.length;
        setTimeout(typeSubtitle, 500);
    }
}

// ===========================
// 4. Sun & Moon Scroll Animation
// ===========================
const sun = document.querySelector('.sun');
const moon = document.querySelector('.moon');

window.addEventListener('scroll', () => {
    const scrollPercent = window.scrollY / window.innerHeight; // 0 to 1

    if (document.documentElement.getAttribute('data-theme') === 'dark') {
        sun.style.opacity = 0;
        moon.style.opacity = 1;
        const moonY = 100 - scrollPercent * 50;
        moon.style.transform = `translate(-50%, ${moonY}%)`;
        moon.style.boxShadow = `0 0 ${50 + scrollPercent * 50}px ${15 + scrollPercent * 20}px rgba(200,220,255,${0.3 + scrollPercent * 0.3})`;
    } else {
        moon.style.opacity = 0;
        sun.style.opacity = 1;
        const sunY = 50 - scrollPercent * 50;
        sun.style.transform = `translate(-50%, ${sunY}%)`;
        sun.style.boxShadow = `0 0 ${60 + scrollPercent * 50}px ${20 + scrollPercent * 20}px rgba(255,200,50,${0.4 + scrollPercent * 0.3})`;
    }
});

// ===========================
// 5. Smooth Custom Cursor
// ===========================
const dot = document.querySelector('.cursor-dot');
const outline = document.querySelector('.cursor-outline');

let mouseX = 0, mouseY = 0;
let outlineX = 0, outlineY = 0;

window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = `${mouseX}px`;
    dot.style.top = `${mouseY}px`;
});

function animateCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.left = outlineX + 'px';
    outline.style.top = outlineY + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .skill-card').forEach(item => {
    item.addEventListener('mouseenter', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        outline.style.background = 'rgba(124,77,255,0.1)';
    });
    item.addEventListener('mouseleave', () => {
        outline.style.transform = 'translate(-50%, -50%) scale(1)';
        outline.style.background = 'transparent';
    });
});

// ===========================
// 6. Particle Animation
// ===========================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let particlesArray = [];
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() - 0.5;
        this.speedY = Math.random() - 0.5;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.01;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }
    draw() {
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--primary-purple');
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particlesArray = [];
    for (let i = 0; i < 80; i++) particlesArray.push(new Particle());
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particlesArray.forEach((p, idx) => {
        p.update();
        p.draw();
        if (p.size <= 0.2) {
            particlesArray[idx] = new Particle();
        }
    });
    requestAnimationFrame(animateParticles);
}

// ===========================
// 7. Theme Toggle & Scroll-to-Top
// ===========================
const themeBtn = document.getElementById('theme-btn');
themeBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeBtn.textContent = isDark ? '🌙' : '☀️';
});

const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) canvas.classList.add('canvas-visible');
    else canvas.classList.remove('canvas-visible');

    scrollTopBtn.style.display = window.scrollY > 400 ? "block" : "none";
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===========================
// 8. Initialize on Load
// ===========================
window.onload = () => {
    typeEffect();
    typeSubtitle();
    initParticles();
    animateParticles();
};
