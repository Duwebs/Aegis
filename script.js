const toggleBtn = document.getElementById('theme-toggle');
const ripple = document.getElementById('ripple-overlay');

toggleBtn.addEventListener('click', (e) => {
    const rect = toggleBtn.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // 1. Current mode ke hisaab se ripple color set karo
    const isDark = document.body.classList.contains('bg-slate-950');
    ripple.style.backgroundColor = isDark ? '#ffffff' : '#020617';
    ripple.style.opacity = '1';

    // 2. Ripple expand karo
    ripple.style.transition = 'clip-path 0.6s ease-in-out';
    ripple.style.clipPath = `circle(150% at ${x}px ${y}px)`;

    // 3. Animation ke beech mein background change karo (0.3s par)
    setTimeout(() => {
        document.body.classList.toggle('bg-slate-950');
        document.body.classList.toggle('bg-white');
        document.body.classList.toggle('text-white');
        document.body.classList.toggle('text-slate-900');
    }, 300);

    // 4. Animation khatam hone par cleanup
    setTimeout(() => {
        ripple.style.opacity = '0';
        ripple.style.clipPath = `circle(0% at ${x}px ${y}px)`;
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
