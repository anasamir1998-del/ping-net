document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        // Check if the click is outside the menu toggle and the nav itself
        if (menuToggle && nav && !menuToggle.contains(e.target) && !nav.contains(e.target)) {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            // Close mobile menu on click if it's open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Original offset
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
            header.style.padding = '10px 0';
        } else {
            header.style.boxShadow = 'none';
            header.style.padding = '15px 0';
        }
    });
});

// Safe Scroll Animation
// We only add the hidden class if JS is running, effectively progressive enhancement.
const animatedElements = document.querySelectorAll('.about-card, .service-card, .project-card, .section-title, .about-text-full');

const observerOptions = {
    threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-element');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(el => {
    el.classList.add('hidden-element'); // Hide only when JS is ready
    observer.observe(el);
});

// Stats Counter Animation
const statsSection = document.querySelector('.stats');
const counters = document.querySelectorAll('.counter');
let started = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000;
                const increment = target / (duration / 16);

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current) + "+";
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target + "+";
                    }
                };
                updateCounter();
            });
            started = true;
        }
    });
    statsObserver.observe(statsSection);
}

// AI Chat Widget Logic
document.addEventListener('DOMContentLoaded', () => {
    const chatToggle = document.getElementById('chatToggle');
    const chatWidget = document.getElementById('chatWidget');
    const closeChat = document.getElementById('closeChat');
    const chatInput = document.getElementById('chatInput');
    const sendMessage = document.getElementById('sendMessage');
    const chatBody = document.getElementById('chatBody');

    if (chatToggle && chatWidget) {
        chatToggle.addEventListener('click', () => {
            chatWidget.classList.add('active');
            chatToggle.style.display = 'none';
        });

        closeChat.addEventListener('click', () => {
            chatWidget.classList.remove('active');
            chatToggle.style.display = 'flex';
        });
    }

    const addMessage = (text, sender) => {
        const div = document.createElement('div');
        div.classList.add('message', sender);

        const content = document.createElement('div');
        content.classList.add('message-content');
        content.innerHTML = text;

        const time = document.createElement('div');
        time.classList.add('message-time');
        time.innerText = new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' });

        div.appendChild(content);
        div.appendChild(time);
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    const getAIResponse = (input) => {
        const text = input.toLowerCase();

        if (text.includes('سعر') || text.includes('بكام') || text.includes('تكلفة')) {
            return 'الأسعار تختلف حسب حجم المشروع ونوع الخدمات المطلوبة. يرجى التواصل معنا هاتفياً أو عبر الواتساب للحصول على عرض سعر دقيق. 💰';
        }
        if (text.includes('خدمات') || text.includes('تعملوا') || text.includes('نشاط')) {
            return 'نقدم حلول متكاملة تشمل:<br>- كاميرات المراقبة<br>- الشبكات والسنترالات<br>- أجهزة البصمة والتحكم في الدخول<br>- الأنظمة الصوتية<br>- تصميم المواقع والتطبيقات';
        }
        if (text.includes('موقع') || text.includes('عنوان') || text.includes('مكان')) {
            return 'نحن نعمل بشكل أساسي في المملكة العربية السعودية، ونقدم خدماتنا في مختلف المناطق. 🇸🇦';
        }
        if (text.includes('تواصل') || text.includes('رقم') || text.includes('اتصال')) {
            return 'يمكنك الاتصال بنا على: 0592973183<br>أو مراسلتنا عبر الواتساب مباشرة من الزر الموجود في الموقع. 📞';
        }
        if (text.includes('سلام') || text.includes('مرحبا') || text.includes('هلا')) {
            return 'أهلاً بك! أنا هنا لمساعدتك. تفضل بطرح استفسارك. 😊';
        }
        if (text.includes('شكرا') || text.includes('يعطيك العافية')) {
            return 'العفو! نحن في الخدمة دائماً. 🌹';
        }

        return 'عذراً، لم أفهم استفسارك تماماً. 🤔<br>يمكنك اختيار أحد المواضيع التالية:<br>- خدماتنا<br>- الأسعار<br>- طرق التواصل';
    }

    const handleUserMessage = () => {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';

        // Simulate typing
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot');
        loadingDiv.innerHTML = '<div class="message-content">جاري الكتابة...</div>';
        chatBody.appendChild(loadingDiv);
        chatBody.scrollTop = chatBody.scrollHeight;

        setTimeout(() => {
            loadingDiv.remove();
            const response = getAIResponse(text);
            addMessage(response, 'bot');
        }, 1000);
    }

    if (sendMessage && chatInput) {
        sendMessage.addEventListener('click', handleUserMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleUserMessage();
        });
    }
});

// Custom Right Click Alert
const createCustomAlert = () => {
    if (document.getElementById('customAlert')) return;

    const alertHTML = `
        <div id="customAlert" class="custom-alert-overlay">
            <div class="custom-alert-box">
                <div class="custom-alert-icon">😎</div>
                <div class="custom-alert-message">غير مسموح يا برنس</div>
                <p style="color: #94a3b8;">حقوق الملكية محفوظة لـ PING NET</p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', alertHTML);

    const alertOverlay = document.getElementById('customAlert');

    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        alertOverlay.classList.add('active');
        if (navigator.vibrate) navigator.vibrate(200);
    });

    // Mobile Long Press Support with Tolerance
    let longPressTimer;
    let startX, startY;
    let longPressHappened = false;
    const tolerance = 10;

    document.addEventListener('touchstart', (e) => {
        longPressHappened = false;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;

        longPressTimer = setTimeout(() => {
            longPressHappened = true;
            alertOverlay.classList.add('active');
            if (navigator.vibrate) navigator.vibrate(200);
        }, 500);
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        const diffX = Math.abs(e.touches[0].clientX - startX);
        const diffY = Math.abs(e.touches[0].clientY - startY);

        if (diffX > tolerance || diffY > tolerance) {
            clearTimeout(longPressTimer);
        }
    }, { passive: false });

    document.addEventListener('touchend', (e) => {
        clearTimeout(longPressTimer);
        if (longPressHappened) {
            e.preventDefault(); // Prevent ghost click
        }
    }, { passive: false });

    document.addEventListener('touchcancel', () => clearTimeout(longPressTimer));

    // Close on click anywhere
    alertOverlay.addEventListener('click', () => {
        alertOverlay.classList.remove('active');
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') alertOverlay.classList.remove('active');
    });
};

document.addEventListener('DOMContentLoaded', createCustomAlert);

// Preloader Logic
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }, 1500); // Minimum 1.5s display time
    }
});

// Typewriter Effect
const typewriterElement = document.getElementById('typewriter');
if (typewriterElement) {
    const phrases = [
        "حلول تقنية متكاملة",
        "نبتكر المستقبل الرقمي",
        "نؤمن بياناتك وأعمالك",
        "شريكك في النجاح"
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new phrase
        }

        setTimeout(type, typeSpeed);
    }

    // Start typing after preloader
    setTimeout(type, 2000);
}

// Back to Top Logic
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
}
