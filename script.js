// --- تهيئة مكتبة AOS للحركات ---
AOS.init({
    once: true, 
    offset: 120,
    easing: 'ease-out-cubic'
});

// --- Scroll Progress Bar Logic ---
window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById('progressBar').style.width = scrolled + '%';
});

// --- Animated Stats Counter Logic ---
const counters = document.querySelectorAll('.stat-number');
const speed = 100; 
const observerOptions = { root: null, threshold: 0.5 };

const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
            observer.unobserve(counter);
        }
    });
}, observerOptions);

counters.forEach(counter => { statsObserver.observe(counter); });

// --- WhatsApp Form Logic ---
document.getElementById('whatsappForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    // تحديث المتغيرات لتناسب كود الـ HTML الخاص بالعيادة
    const name = document.getElementById('patientName').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const governorate = document.getElementById('governorate').value;
    const inquiry = document.getElementById('inquiry').value;

    const message = `مرحباً دكتور عمرو، أود الاستفسار عن تفاصيل الحجز:\n\n` +
                    `👤 اسم المريض: ${name}\n` +
                    `📱 رقم التليفون: ${phone}\n` +
                    `🎂 العمر: ${age}\n` +
                    `📍 المحافظة: ${governorate}\n\n` +
                    `❓ الشكوى الطبية/الاستفسار: \n${inquiry}`;

    const encodedMessage = encodeURIComponent(message);
    const targetPhone = "201107552633"; // رقم الحجز الخاص بالعيادة
    const whatsappUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
});
// ================= إضافات الـ UI/UX التفاعلية =================

// 1. Typewriter Effect (كتابة التخصصات الطبية)
const typeWriterElement = document.querySelector('.typed-text');
const words = ['جراحات العظام والكسور', 'مناظير المفاصل', 'جراحات اليد والرسغ', 'جراحات الكتف والركبة', 'الإصابات الرياضية'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    // التأكد من وجود العنصر في الصفحة لتجنب الأخطاء
    if (!typeWriterElement) return;

    const currentWord = words[wordIndex];
    if (isDeleting) {
        typeWriterElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeWriterElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
        typeSpeed = 2000; // الانتظار بعد كتابة الكلمة
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typeSpeed = 500; // الانتظار قبل الكلمة الجديدة
    }
    setTimeout(type, typeSpeed);
}
document.addEventListener('DOMContentLoaded', type);

// 2. Dark Mode Toggle
const darkModeBtn = document.getElementById('darkModeToggle');
if(darkModeBtn) {
    darkModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const icon = darkModeBtn.querySelector('i');
        if(document.body.classList.contains('dark-mode')){
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    });
}

// 3. Custom Cursor Logic (للشاشات الكبيرة)
if (window.innerWidth >= 768) {
    const customCursor = document.querySelector('.custom-cursor');
    if(customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.left = e.clientX + 'px';
            customCursor.style.top = e.clientY + 'px';
        });
        // إضافة التأثير عند الوقوف على الأزرار والروابط
        document.querySelectorAll('a, button, .glass-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });
    }
}

// 4. Particles.js Initialization (خلفية الجزيئات)
if(typeof particlesJS !== 'undefined' && document.getElementById('particles-js')) {
    particlesJS("particles-js", {
        "particles": {
            "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
            // تغيير لون الجزيئات للذهبي أو الأبيض ليتناسب مع الهوية
            "color": { "value": "#d4af37" }, 
            "shape": { "type": "circle" },
            "opacity": { "value": 0.4, "random": false },
            "size": { "value": 3, "random": true },
            "line_linked": { "enable": true, "distance": 150, "color": "#d4af37", "opacity": 0.3, "width": 1 },
            "move": { "enable": true, "speed": 2, "direction": "none", "out_mode": "out" }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": { "onhover": { "enable": true, "mode": "grab" }, "onclick": { "enable": true, "mode": "push" } },
            "modes": { "grab": { "distance": 150, "line_linked": { "opacity": 0.8 } }, "push": { "particles_nb": 3 } }
        },
        "retina_detect": true
    });
}
// ================= وظائف المرحلة الاحترافية =================

// 1. Preloader Logic (إخفاء شاشة التحميل لما الموقع يجهز)
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if(preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => { preloader.style.display = 'none'; }, 500);
        }, 1500); // إظهار الشاشة لمدة ثانية ونص لجمال التأثير
    }
});

// 2. Magnetic Buttons Logic (التأثير المغناطيسي للأزرار)
if (window.innerWidth >= 768) {
    const magnets = document.querySelectorAll('.magnetic');
    if(magnets.length > 0) {
        magnets.forEach(magnet => {
            magnet.addEventListener('mousemove', function(e) {
                const position = magnet.getBoundingClientRect();
                const x = e.clientX - position.left - position.width / 2;
                const y = e.clientY - position.top - position.height / 2;
                magnet.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
            });
            magnet.addEventListener('mouseout', function(e) {
                magnet.style.transform = 'translate(0px, 0px)';
            });
        });
    }
}