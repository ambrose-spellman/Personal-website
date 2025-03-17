const menuButton = document.querySelector(".menu-toggle");
const menuOverlay = document.querySelector(".menu-overlay");
let lastScrollTop = 0;
const header = document.querySelector('#header');
const headerHeight = header.offsetHeight;

window.addEventListener('scroll', function() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;

    if (scrollTop > headerHeight) {
        // Scrolling down
        if (scrollTop > lastScrollTop) {
            header.classList.add('sticky');
        } 
        // Scrolling up
        else {
            header.classList.remove('sticky');
            // header.style.position = 'static';
        }
    } else {
        header.classList.remove('sticky');
        // header.style.position = 'static';
    }

    lastScrollTop = scrollTop;
});
menuButton.addEventListener("click", function () {
  menuButton.classList.toggle("active");
  menuOverlay.classList.toggle("open");
});


(function () {

    const smoothScroll = function (targetEl, duration) {
        const headerElHeight =  document.querySelector('.header').clientHeight;
        let target = document.querySelector(targetEl);
        let targetPosition = target.getBoundingClientRect().top - headerElHeight;
        let startPosition = window.scrollY;
        let startTime = null;
    
        const ease = function(t,b,c,d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };
    
        const animation = function(currentTime){
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0,run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);

    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.nav-link');
        links.forEach(each => {
            each.addEventListener('click', function () {
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
                if(menuOverlay.classList.contains("open")) {
                    menuOverlay.classList.remove("open");
                    const currentTarget = this.getAttribute('href');
                
                }
            });
        });
    };
    scrollTo();
    
}());

const scrollToTopBtn = document.querySelector('.to-top');
window.addEventListener('scroll', function() {
    if (window.scrollY > 1000) { // Show button after scrolling 300px
        scrollToTopBtn.style.display = 'block';
    } else {
        scrollToTopBtn.style.display = 'none';
    }
});
scrollToTopBtn.addEventListener('click', function(e) {
    e.preventDefault(); // Prevent default anchor behavior
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
// copy email 

// Функция для копирования текста
function copyText(text, button) {
    navigator.clipboard.writeText(text).then(function() {
        console.log('Текст успешно скопирован');
        showTooltip(button, 'Скопировано!');
    }, function(err) {
        console.error('Не удалось скопировать текст: ', err);
        showTooltip(button, 'Ошибка копирования');
    });
}

// Функция для отображения тултипа
function showTooltip(element, message) {
    // Создаем элемент тултипа
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.className = 'tooltip';
    
    // Стили для тултипа
    tooltip.style.position = 'absolute';
    tooltip.style.backgroundColor = 'rgba(0,0,0,0.7)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '5px';
    tooltip.style.fontSize = '14px';
    tooltip.style.zIndex = '1000';

    // Добавляем тултип в DOM
    document.body.appendChild(tooltip);

    // Позиционируем тултип
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;

    // Удаляем тултип через 2 секунды
    setTimeout(() => {
        document.body.removeChild(tooltip);
    }, 2000);
}

// Находим кнопкr с классом 'copy-button'
const copyButton = document.querySelector('.copy-button');

// Добавляем обработчик события для  кнопки

copyButton.addEventListener('click', function() {
    const textToCopy = this.getAttribute('data-copy-text');
    copyText(textToCopy, this);
});
document.addEventListener('DOMContentLoaded', function() {
    const dropdownParent = document.querySelector('.breadcrumb-item.active');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownParent && dropdown) {
        dropdownParent.addEventListener('mouseenter', function() {
            dropdown.style.display = 'flex';
        });

        dropdownParent.addEventListener('mouseleave', function() {
            dropdown.style.display = 'none';
        });
    }
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.tabTarget);
      
      // Скрываем все табы
      document.querySelectorAll('.tab-content').forEach(content => {
        content.style.display = 'none';
      });
      
      // Убираем активный класс у всех табов
      document.querySelectorAll('.tab').forEach(t => {
        t.classList.remove('active');
      });
      
      // Показываем выбранный таб и добавляем активный класс
      target.style.display = 'block';
      tab.classList.add('active');
    });
  });