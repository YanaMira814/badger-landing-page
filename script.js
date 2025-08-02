// Плавная прокрутка к секциям
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Обработка формы
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('badgeForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем данные формы
            const formData = new FormData(form);
            const name = formData.get('name');
            const email = formData.get('email');
            const message = formData.get('message');
            const newsletter = formData.get('newsletter');
            
            // Простая валидация
            if (!name || !email) {
                showNotification('Пожалуйста, заполните все обязательные поля!', 'error');
                return;
            }
            
            // Имитация отправки формы
            showNotification('Спасибо за сообщение! Мы скоро свяжемся с тобой! 🦡', 'success');
            
            // Очищаем форму
            form.reset();
        });
    }
    
    // Добавляем анимации при скролле
    addScrollAnimations();
    
    // Добавляем интерактивные эффекты
    addInteractiveEffects();
});

// Показ уведомлений
function showNotification(message, type = 'info') {
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '🦡' : '⚠️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Добавляем стили
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? 'linear-gradient(45deg, #4ecdc4, #44a08d)' : 'linear-gradient(45deg, #ff6b6b, #ff8e53)'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Добавляем в документ
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Автоматическое удаление через 5 секунд
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Анимации при скролле
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Наблюдаем за карточками фактов
    document.querySelectorAll('.fact-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Наблюдаем за шутками
    document.querySelectorAll('.joke-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Наблюдаем за элементами галереи
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });
}

// Интерактивные эффекты
function addInteractiveEffects() {
    // Эффект параллакса для плавающих элементов
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.badge-float');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
    
    // Эффект наведения для карточек
    document.querySelectorAll('.fact-card, .joke-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.classList.contains('fact-card') ? 
                'translateY(-10px) scale(1.02)' : 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.classList.contains('fact-card') ? 
                'translateY(0) scale(1)' : 'scale(1)';
        });
    });
    
    // Эффект клика для иконок культуры
    document.querySelectorAll('.culture-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            this.style.transform = 'scale(1.2) rotate(10deg)';
            setTimeout(() => {
                this.style.transform = 'scale(1) rotate(0deg)';
            }, 300);
        });
    });
    
    // Эффект для диаграммы
    document.querySelectorAll('.chart-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            const bar = this.querySelector('.chart-bar');
            if (bar) {
                bar.style.transform = 'scaleY(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const bar = this.querySelector('.chart-bar');
            if (bar) {
                bar.style.transform = 'scaleY(1)';
            }
        });
    });
}

// Случайные факты о барсуках
const randomBadgeFacts = [
    "Знаешь ли ты, что барсуки могут бегать со скоростью до 30 км/ч?",
    "Барсуки - отличные пловцы и могут нырять на глубину до 2 метров!",
    "У барсуков отличная память - они помнят расположение всех своих нор!",
    "Барсуки могут жить до 14 лет в дикой природе!",
    "Барсуки - настоящие чистюли и регулярно убирают свои норы!",
    "Барсуки могут вырыть нору глубиной до 3 метров за одну ночь!"
];

// Показ случайного факта
function showRandomFact() {
    const randomFact = randomBadgeFacts[Math.floor(Math.random() * randomBadgeFacts.length)];
    showNotification(randomFact, 'info');
}

// Добавляем кнопку для показа случайного факта
document.addEventListener('DOMContentLoaded', function() {
    // Создаем плавающую кнопку
    const floatingButton = document.createElement('button');
    floatingButton.innerHTML = '🦡';
    floatingButton.className = 'floating-fact-button';
    floatingButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(45deg, #ff6b6b, #ff8e53);
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        transition: all 0.3s ease;
    `;
    
    floatingButton.addEventListener('click', showRandomFact);
    floatingButton.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1) rotate(10deg)';
    });
    floatingButton.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
    
    document.body.appendChild(floatingButton);
});

// Эффект печатной машинки для заголовка
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Инициализация эффекта печатной машинки при загрузке
document.addEventListener('DOMContentLoaded', function() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 150);
        }, 1000);
    }
});

// Консольные сообщения для разработчиков
console.log('🦡 Барсуки - это круто! 🦡');
console.log('Создано с любовью к природе и программированию');
console.log('Факт дня: Барсуки могут вырыть нору глубиной до 3 метров!'); 