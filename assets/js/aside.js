const aside = document.getElementById('myAside');
const closeBtn = document.getElementById('closeAside');
const overlay = document.getElementById('overlay');
const openBtn = document.getElementById('openAside'); // jouw bestaande openknop

// Open aside
openBtn.addEventListener('click', () => {
  aside.classList.add('open');
  aside.classList.remove('closed');
  overlay.classList.remove('hidden');
});

// Sluit aside
function closeAside() {
  aside.classList.remove('open');
  aside.classList.add('closed');
  overlay.classList.add('hidden');
}

closeBtn.addEventListener('click', closeAside);
overlay.addEventListener('click', closeAside);