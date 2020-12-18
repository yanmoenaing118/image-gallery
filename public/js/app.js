const form = document.querySelector(".form");
const button = document.querySelector(".submit");

const fileInputElem = document.getElementById("chooseFile");

if (form) {
  form.addEventListener("submit", handleSubmit);
}

if (button) {
  form.addEventListener("submit", handleSubmit);
}

if (fileInputElem) {
  fileInputElem.addEventListener("change", handleFileSelected);
}

async function handleSubmit(e) {
  e.preventDefault();
  setTextContext("submit", "uploading...");
  const formData = new FormData(form);

  fetch("https://fileuploadgallery.herokuapp.com/api/v1/uploads/images", {
    method: "POST",
    body: formData,
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.data.url);
      createImage(result.data.url, result.data.title);
    });
}

function createImage(url, title) {
  const gallery = document.querySelector(".gallery");
  const galleryImg = document.createElement("div");
  galleryImg.classList.add("gallery-img");
  const img = document.createElement("img");
  img.setAttribute("alt", title);
  img.setAttribute("title", title);
  img.src = `uploads/${url}`;
  galleryImg.appendChild(img);
  gallery.appendChild(galleryImg);

  img.addEventListener("load", () => {
    setTextContext("submit", "upload");
  });
}

function setTextContext(className, text) {
  const el = document.querySelector(`.${className}`);
  el.textContent = text;
}

function handleFileSelected(e) {
  let file = this.files[0];
  let freader = new FileReader();
  freader.readAsDataURL(file);

  let img = document.createElement("img");
  img.file = file;

  freader.onload = (function (aImg) {
    return function (event) {
      aImg.src = event.target.result;
      showSelectedFile(aImg);
    };
  })(img);
}

function showSelectedFile(img) {
  let modal = document.querySelector(".modal");

  modal.style.display = "flex";

  document.querySelector(".modal-body").appendChild(img);

  document.querySelector(".main-left").appendChild(modal);

  confirmFile();
}

function confirmFile() {
  document.querySelector(".ok-btn").addEventListener("click", function () {
    document.querySelector(".modal").style.display = "none";
    removeOldImage();
  });
}

function removeOldImage() {
  let childImg = document.querySelector(".modal-body img");
  if (childImg) {
    document.querySelector(".modal-body").removeChild(childImg);
  }
}
