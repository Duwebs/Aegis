// --- Theme Toggle Logic ---
const toggleBtn = document.getElementById('theme-toggle');
const container = document.getElementById('app-container');

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation(); 
    e.preventDefault();
    toggleBtn.innerText = (toggleBtn.innerText === '🌙') ? '☀️' : '🌙';

    const x = e.clientX;
    const y = e.clientY;
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.width = '100vw';
    ripple.style.height = '100vh';
    ripple.style.zIndex = '5';
    ripple.style.pointerEvents = 'none';
    
    const isDark = document.body.classList.contains('bg-slate-950');
    ripple.style.backgroundColor = isDark ? '#ffffff' : '#020617';
    ripple.style.clipPath = `circle(0% at ${x}px ${y}px)`;
    document.body.appendChild(ripple);

    requestAnimationFrame(() => {
        ripple.style.transition = 'clip-path 0.6s ease-in-out';
        ripple.style.clipPath = `circle(150% at ${x}px ${y}px)`;
    });

    setTimeout(() => {
        document.body.classList.toggle('bg-slate-950');
        document.body.classList.toggle('bg-white');
        container.classList.toggle('text-white');
        container.classList.toggle('text-slate-900');
    }, 300);

    setTimeout(() => ripple.remove(), 700);
});

const sosBtn = document.getElementById('sos-btn');
const ring = document.getElementById('progress-ring');

let sosTimeout;

const triggerEmergency = () => {
    // 1. Siren Play
    const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'); // Demo link
    audio.play();
    
    // 2. Geolocation Fetch
    navigator.geolocation.getCurrentPosition((pos) => {
        const msg = `ALERT! Emergency at: https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
        console.log("Sending:", msg);
        alert(msg); // Yahan Twilio API call aayegi
    });
};

const startSOS = (e) => {
    if (e) e.preventDefault();
    ring.style.strokeDashoffset = '0';
    sosTimeout = setTimeout(triggerEmergency, 3000);
};

const resetSOS = () => {
    clearTimeout(sosTimeout);
    ring.style.strokeDashoffset = '754';
};

// Event Listeners (Ensure button exists)
if (sosBtn) {
    sosBtn.addEventListener('mousedown', startSOS);
    sosBtn.addEventListener('mouseup', resetSOS);
    sosBtn.addEventListener('mouseleave', resetSOS);
    sosBtn.addEventListener('touchstart', (e) => { e.preventDefault();
        startSOS(); }, { passive: false });
    sosBtn.addEventListener('touchend', resetSOS);
} else {
    console.error("SOS Button nahi mila!");
}

// --- Scroll Overlay ---
const overlay = document.getElementById('overlay');
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        overlay.classList.remove('translate-y-[90%]'); // Tumhare HTML mein 90% tha
        overlay.classList.add('translate-y-0');
    } else {
        overlay.classList.add('translate-y-[90%]');
        overlay.classList.remove('translate-y-0');
    }
});



// Copy, Paste, Cut aur Right-Click disable karne ke liye
document.addEventListener('contextmenu', (e) => e.preventDefault()); // Right click disable

document.addEventListener('copy', (e) => {
    e.preventDefault();
    alert("Copying is disabled!");
});

document.addEventListener('cut', (e) => {
    e.preventDefault();
    alert("Cutting is disabled!");
});

document.addEventListener('keydown', (e) => {
    // Ctrl+C, Ctrl+V, Ctrl+U, F12 disable karne ke liye
    if (e.ctrlKey && (e.key === 'c' || e.key === 'v' || e.key === 'u' || e.key === 'x')) {
        e.preventDefault();
    }
    if (e.key === 'F12') {
        e.preventDefault();
    }
});


function sendWhatsApp(lat, lon) {
    const message = encodeURIComponent(`🚨 EMERGENCY SOS! Meri location ye hai: https://www.google.com/maps?q=${lat},${lon}`);
    const phoneNumber = "918882947521"; // Jisko bhejna hai uska number
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Auto-redirect to WhatsApp
    window.open(whatsappURL, '_blank');
}
