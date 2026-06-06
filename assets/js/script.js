// ============ Theme Toggle ============
const initTheme = () => {
  // Check localStorage for saved theme, default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeButton(savedTheme);
};

const toggleTheme = () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButton(newTheme);
  
  // Add animation effect
  const button = document.querySelector('.theme-toggle');
  button.style.transform = 'scale(0.95)';
  setTimeout(() => {
    button.style.transform = '';
  }, 300);
};

const updateThemeButton = (theme) => {
  const button = document.querySelector('.theme-toggle');
  if (button) {
    button.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }
};

// Create theme toggle button
const createThemeToggle = () => {
  const button = document.createElement('button');
  button.className = 'theme-toggle';
  button.setAttribute('title', 'Toggle theme');
  button.innerHTML = '☀️';
  button.onclick = toggleTheme;
  document.body.appendChild(button);
};

// ============ Reveal on Scroll Animation ============
const observeReveals = () => {
  const reveals = document.querySelectorAll('.reveal');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  reveals.forEach((el) => observer.observe(el));
};

// ============ Smooth Scroll for Anchor Links ============
const setupSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// ============ Active Navigation Link on Scroll ============
const updateActiveNav = () => {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  
  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (scrollY >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.href.includes(current) && current) {
        link.classList.add('active');
      }
    });
  });
};

// ============ Navbar Background on Scroll ============
const setupNavbarScroll = () => {
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.boxShadow = '';
    }
  });
};

// ============ Initialize Everything ============
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  createThemeToggle();
  observeReveals();
  setupSmoothScroll();
  updateActiveNav();
  setupNavbarScroll();
});

// Reinitialize reveals on dynamic content changes
const setupMutationObserver = () => {
  const observer = new MutationObserver(() => {
    observeReveals();
  });
  
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
};