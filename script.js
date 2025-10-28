window.addEventListener("load", function onLoadInit() {
  console.log("onload -> initializing gallery");
  initGallery();
  addTabFocus();
});

const mainImage = document.getElementById("mainImage");
const mainCaption = document.getElementById("mainCaption");
const thumbs = document.getElementById("thumbs");

function initGallery() {
  const thumbItems = Array.from(thumbs.querySelectorAll(".thumb"));
  thumbItems.forEach((item) => {
    const img = item.querySelector("img");
    item.addEventListener("mouseover", () => previewImage(img));
    item.addEventListener("mouseleave", () => item.classList.remove("focused"));
    item.addEventListener("click", () => selectImage(img));
  });
}

function addTabFocus() {
  console.log("addTabFocus called — adding tabindex to thumbnails");
  const thumbItems = Array.from(thumbs.querySelectorAll(".thumb"));
  thumbItems.forEach((item, idx) => {
    const img = item.querySelector("img");
    item.setAttribute("tabindex", "0");
    const alt = img.getAttribute("alt") || `Image ${idx + 1}`;
    item.setAttribute("aria-label", `${alt} — press Enter to view`);

    item.addEventListener("focus", () => {
      console.log("focus event on thumbnail:", alt);
      item.classList.add("focused");
      previewImage(img);
    });

    item.addEventListener("blur", () => {
      console.log("blur event on thumbnail:", alt);
      item.classList.remove("focused");
    });

    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectImage(img);
      }
    });
  });
}

function previewImage(img) {
  const large = img.dataset.large;
  const alt = img.alt || "";
  mainImage.src = large;
  mainImage.alt = alt;
  mainCaption.textContent = alt;
}

function selectImage(img) {
  previewImage(img);
  Array.from(thumbs.querySelectorAll(".thumb")).forEach((t) =>
    t.classList.remove("selected")
  );
  img.closest(".thumb").classList.add("selected");
}

window.previewImage = previewImage;
window.selectImage = selectImage;
window.addTabFocus = addTabFocus;
window.initGallery = initGallery;
