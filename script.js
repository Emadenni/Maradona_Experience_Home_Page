async function loadOverlay() {
  const overlayHTML = await fetch("overlay/overlay.html").then((res) => res.text());
  document.body.insertAdjacentHTML("beforeend", overlayHTML);

  const overlay = document.querySelector(".overlay");
  const closeButton = document.querySelector(".close-overlay");

  closeButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
  });

  overlay.classList.remove("hidden");
}

window.addEventListener("DOMContentLoaded", () => {
  loadOverlay();
});
