const aside = document.getElementById('mySidebar');
const toggleBtn = document.getElementById('toggleSidebar');

// Toggle aside visibility
toggleBtn.addEventListener('click', () => {
  aside.classList.toggle('open');
  aside.classList.toggle('closed');
});
