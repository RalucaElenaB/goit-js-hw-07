import { galleryItems } from "./gallery-items.js";

//get HTML ELEMENT
const gallery = document.querySelector(".gallery");

//gallery markup from gallery items Array of image objects
const galleryMarkup = galleryItems
  .map(
    (image) =>
      `<li class="gallery__item">
     <a class="gallery__link" href=${image.original}>
       <img class="gallery__image" src=${image.preview} data-source=${image.original} alt="${image.description}" />
    </a>
   </li>`
  )
  .join("");

//add gallery html into dom
gallery.insertAdjacentHTML("beforeEnd", galleryMarkup);

//create and show a modal image
function selectedImageModal(event) {
  event.preventDefault();
  if (event.target.nodeName !== `IMG`) {
    return;
  }
  const fullSizeImg = event.target.dataset.source;

  const imageModal = basicLightbox.create(`<img src="${fullSizeImg}"/>`);
  imageModal.show();

  //escape button closes modal functionality added when modal opens
  imageModal.show(() =>
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        imageModal.close();
      }
    })
  );
}

//click listening with above function
gallery.addEventListener("click", selectedImageModal);
