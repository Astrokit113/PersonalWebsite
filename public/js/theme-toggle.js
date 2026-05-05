document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  function applyTheme(theme) {
    htmlElement.setAttribute('data-theme', theme);
    htmlElement.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
    window.dispatchEvent(new CustomEvent('themechanged', { detail: { theme } }));
    if (theme === 'dark') {
      document.body.style.backgroundColor = '#1a1818';
      document.body.style.color = '#ecdddd';
    } else {
      document.body.style.backgroundColor = '#f7f3f3';
      document.body.style.color = '#1f1c1c';
    }
  }

  function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      const currentTheme = htmlElement.getAttribute('data-theme') || localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      applyTheme(newTheme);
    });
  }

  initTheme();
});

