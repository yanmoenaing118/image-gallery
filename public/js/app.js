const form = document.querySelector(".form");
const button = document.querySelector(".submit");

if (form) {
  document.addEventListener("submit", handleSubmit);
}

if (button) {
  document.addEventListener("submit", handleSubmit);
}

async function handleSubmit(e) {
  e.preventDefault();
  setTextContext("submit", "uploading...");
  const formData = new FormData(form);

  fetch("http://localhost:3000/api/v1/uploads/images", {
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
    setTextContext("submit", "Save");
  });
}

function setTextContext(className, text) {
  const el = document.querySelector(`.${className}`);
  el.textContent = text;
}
