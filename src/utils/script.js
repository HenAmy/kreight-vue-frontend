const tabs = document.querySelectorAll('.tab');
const panels = document.querySelectorAll('.panel');

const btn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');
const logo = document.getElementById('logo');

// Tabs menu event listener
tabs.forEach((tab) => tab.addEventListener('click', onTabClick));

// Hamburger button listener
btn.addEventListener('click', navToggle);

function onTabClick(e) {
  // Deactivate all tabs
  tabs.forEach((tab) => {
    // console.log(tab.children[0]);
    tab.children[0].classList.remove('font-semibold', 'bg-primary', 'text-white');
  });

  // Hide all panels
  panels.forEach((panel) => panel.classList.add('hidden'));

  // Activate a new tab and panel based on the target
  e.target.classList.add('font-semibold', 'bg-primary', 'text-white');
  const classString = e.target.getAttribute('data-target');
  // console.log(classString);
  document
    .getElementById('panels')
    .getElementsByClassName(classString)[0]
    .classList.remove('hidden');
}

function navToggle() {
  btn.classList.toggle('open');
  menu.classList.toggle('flex');
  menu.classList.toggle('hidden');

  if (menu.classList.contains('flex')) {
    logo.setAttribute('src', './images/logo-accent.svg');
  } else {
    logo.setAttribute('src', './images/logo-primary.svg');
  }
}
