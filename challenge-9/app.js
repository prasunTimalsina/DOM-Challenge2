///elements
const menuPanelEl = document.querySelector(".panel");
const closeMenuBtn = document.querySelector(".close-btn");
const menuToggleBtn = document.querySelector(".toggle-btn");
const menuItemsEl = Array.from(document.querySelectorAll(".menu-item"));

///functions
/* const openMenu = () => {
  menuPanelEl.classList.add("active");
};
*/
const closeMenu = () => {
  menuPanelEl.classList.remove("active");
};

const toggleMenu = () => {
  menuPanelEl.classList.toggle("active");
  if (menuPanelEl.classList.contains("active")) {
    menuToggleBtn.textContent = "Close Menu";
  } else {
    menuToggleBtn.textContent = "Open Menu";
  }
};

//events
menuToggleBtn.addEventListener("click", () => {
  toggleMenu();
});

closeMenuBtn.addEventListener("click", toggleMenu);

document.addEventListener("click", (e) => {
  if (!menuPanelEl.contains(e.target) && e.target !== menuToggleBtn) {
    console.log("clicked");
    closeMenu();
    menuToggleBtn.textContent = "Open Menu";
  }
});

menuItemsEl.forEach((menuItem) => {
  menuItem.addEventListener("click", (e) => {
    alert(e.target.textContent);
    toggleMenu();
  });
});
