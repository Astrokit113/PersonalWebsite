document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('themeToggle');
  const htmlElement = document.documentElement;

  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlElement.style.colorScheme = 'dark';
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.style.colorScheme = 'light';
      htmlElement.setAttribute('data-theme', 'light');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', function() {
      const currentTheme = localStorage.getItem('theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
  }
});
