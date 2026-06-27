const toggleBtn = document.getElementById('theme-toggle');
const container = document.getElementById('app-container');

toggleBtn.addEventListener('click', (e) => {
    // 1. Click position
    const x = e.clientX;
    const y = e.clientY;

    // 2. Ripple layer create karo (body ke direct child ki tarah)
    const ripple = document.createElement('div');
    ripple.style.position = 'fixed';
    ripple.style.top = '0';
    ripple.style.left = '0';
    ripple.style.width = '100vw';
    ripple.style.height = '100vh';
    ripple.style.zIndex = '5'; // Container (z-10) ke piche
    ripple.style.pointerEvents = 'none';
    
    // Theme color decide karo
    const isDark = document.body.classList.contains('bg-slate-950');
    ripple.style.backgroundColor = isDark ? '#ffffff' : '#020617';
    
    // Ripple start
    ripple.style.clipPath = `circle(0% at ${x}px ${y}px)`;
    document.body.appendChild(ripple);

    // 3. Ripple expand (Telegram animation)
    requestAnimationFrame(() => {
        ripple.style.transition = 'clip-path 0.6s ease-in-out';
        ripple.style.clipPath = `circle(150% at ${x}px ${y}px)`;
    });

    // 4. Background change (Content bina hile)
    setTimeout(() => {
        document.body.classList.toggle('bg-slate-950');
        document.body.classList.toggle('bg-white');
        
        // Text color toggle
        container.classList.toggle('text-white');
        container.classList.toggle('text-slate-900');
    }, 300);

    // 5. Cleanup
    setTimeout(() => {
        ripple.remove();
    }, 700);
});

// script.js

// 1. SOS Button Logic
const sosBtn = document.getElementById('sos-btn');

sosBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        alert("SOS Activated! Locating...");
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const mapLink = `https://www.google.com/maps?q=${lat},${lon}`;
                
                console.log("Location Found: " + mapLink);
                // Yahan aage hum Firebase ya SMS API ka code add karenge
                alert("Location sent to emergency contacts: " + mapLink);
            },
            (error) => {
                alert("Error: Location access denied. Please enable GPS.");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

// script.js
const overlay = document.getElementById('overlay');

window.addEventListener('scroll', () => {
    // Check agar user page ke end par hai
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        // Page ke end par aate hi overlay trigger ho jayega
        overlay.classList.remove('translate-y-[90%]');
        overlay.classList.add('translate-y-0');
    } else {
        // Agar user wapas upar jata hai, toh overlay wapas chala jayega
        overlay.classList.add('translate-y-[90%]');
        overlay.classList.remove('translate-y-0');
    }
});
