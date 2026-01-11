// UI utilities and interactions

export class UIManager {
  constructor() {
    this.header = document.querySelector('#header');
    this.menuButton = document.querySelector('.menu-toggle');
    this.menuOverlay = document.querySelector('.menu-overlay');
    this.scrollToTopBtn = document.querySelector('.to-top');
    
    this.init();
  }

  init() {
    this.setupMobileMenu();
    this.setupStickyHeader();
    this.setupSmoothScroll();
    this.setupScrollToTop();
    this.setupCopyButton();
    this.setupTabs();
  }

  setupMobileMenu() {
    if (!this.menuButton || !this.menuOverlay) return;

    this.menuButton.addEventListener('click', () => {
      this.menuButton.classList.toggle('active');
      this.menuOverlay.classList.toggle('open');
    });

    // Close menu when clicking nav links
    const navLinks = this.menuOverlay.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.menuOverlay.classList.contains('open')) {
          this.menuOverlay.classList.remove('open');
          this.menuButton.classList.remove('active');
        }
      });
    });
  }

  setupStickyHeader() {
    if (!this.header) return;

    let lastScrollTop = 0;
    const headerHeight = this.header.offsetHeight;

    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > headerHeight) {
        if (scrollTop > lastScrollTop) {
          this.header.classList.add('sticky');
        } else {
          this.header.classList.remove('sticky');
        }
      } else {
        this.header.classList.remove('sticky');
      }

      lastScrollTop = scrollTop;
    });
  }

  setupSmoothScroll() {
    const smoothScroll = (targetEl, duration) => {
      const headerElHeight = document.querySelector('.header')?.clientHeight || 0;
      const target = document.querySelector(targetEl);
      if (!target) return;

      const targetPosition = target.getBoundingClientRect().top - headerElHeight;
      const startPosition = window.scrollY;
      let startTime = null;

      const ease = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      };

      const animation = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, targetPosition, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      requestAnimationFrame(animation);
    };

    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          smoothScroll(href, 1000);
        }
      });
    });
  }

  setupScrollToTop() {
    if (!this.scrollToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 1000) {
        this.scrollToTopBtn.style.display = 'block';
      } else {
        this.scrollToTopBtn.style.display = 'none';
      }
    });

    this.scrollToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  setupCopyButton() {
    const copyButtons = document.querySelectorAll('.copy-button');
    
    copyButtons.forEach(button => {
      button.addEventListener('click', () => {
        const text = button.getAttribute('data-copy-text');
        this.copyToClipboard(text, button);
      });
    });
  }

  copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
      this.showTooltip(button, 'Copied!');
    }).catch(err => {
      console.error('Failed to copy:', err);
      this.showTooltip(button, 'Copy failed');
    });
  }

  showTooltip(element, message) {
    const tooltip = document.createElement('div');
    tooltip.textContent = message;
    tooltip.className = 'tooltip';
    
    Object.assign(tooltip.style, {
      position: 'absolute',
      backgroundColor: 'rgba(0,0,0,0.7)',
      color: 'white',
      padding: '5px 10px',
      borderRadius: '5px',
      fontSize: '14px',
      zIndex: '1000'
    });

    document.body.appendChild(tooltip);

    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    tooltip.style.top = `${rect.top + window.scrollY - tooltip.offsetHeight - 10}px`;

    setTimeout(() => {
      document.body.removeChild(tooltip);
    }, 2000);
  }

  setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.tabTarget;
        if (!targetSelector) return;

        const target = document.querySelector(targetSelector);
        if (!target) return;

        // Hide all tab contents
        document.querySelectorAll('.tab-content').forEach(content => {
          content.style.display = 'none';
        });

        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));

        // Show selected tab and add active class
        target.style.display = 'block';
        tab.classList.add('active');
      });
    });
  }

  setupDropdown() {
    const dropdownParent = document.querySelector('.breadcrumb-item.active');
    const dropdown = document.querySelector('.dropdown');

    if (dropdownParent && dropdown) {
      dropdownParent.addEventListener('mouseenter', () => {
        dropdown.style.display = 'flex';
      });

      dropdownParent.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
      });
    }
  }
}


