"use strict";

function show_larger(img) {
  const modal = document.createElement("div");
  modal.addEventListener("click", () => modal.remove());
  modal.style.cssText = MODAL_STYLE;
  const largeImg = document.createElement("img");
  largeImg.src = img.src;
  largeImg.style.cssText = IMAGE_STYLE;
  modal.appendChild(largeImg);
  document.body.appendChild(modal);
}

function handle_key_z_press() {
  document.addEventListener("keydown", (e) => {
    if (e.key === "z") states.zPressed = true;
  });
  document.addEventListener("keyup", (e) => {
    if (e.key === "z") states.zPressed = false;
  });
}

function add_event_listener_to_img(img) {
  img.addEventListener("click", (e) => {
    if (states.zPressed) {
      e.preventDefault();
      show_larger(img);
    }
  });
  const parentLink = img.closest("a");
  if (parentLink) {
    parentLink.dataset.handlerAdded = "true";
    parentLink.addEventListener("click", (e) => {
      if (states.zPressed) {
        e.preventDefault();
      }
    });
  }
}

function add_click_handlers_to_imgs() {
  document.querySelectorAll("img").forEach((img) => {
    if (!img.dataset.handlerAdded) {
      img.dataset.handlerAdded = "true";
      add_event_listener_to_img(img);
    }
  });
}

function observer() {
  let timeout;
  const throttleTime = 250;
  const observer = new MutationObserver(() => {
    if (timeout) return;
    timeout = setTimeout(() => {
      const images = document.querySelectorAll("img");
      images.forEach((img) => {
        if (!img.dataset.handlerAdded) {
          add_click_handlers_to_imgs();
        }
      });
      timeout = null;
    }, throttleTime);
  });
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
