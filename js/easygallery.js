const galleryGrid = document.querySelector(".PhotoGallery__Grid");
const checkbox = document.querySelector("input[type=checkbox");
const interactiveButtons = document.querySelector(".Interactive__Buttons");
const lightbox = document.querySelector(".lightbox");
let mockdataPath = "/mockdata/images.json";

//Event delegation on interactive buttons to change grid display
interactiveButtons.addEventListener("click", changeDisplayGrid);
checkbox.addEventListener("change", toggleSwitch, false);

galleryGrid.addEventListener("click", function(e) {
  if (e.target.nodeName === "IMG") {
    const light = document.querySelector(".lightbox");
    light.style.display = "block";
    setTimeout(() => {
      lightbox.style.opacity = 1;
    }, 100);
  }
});

//Close event for the lightbox <span class="close">...</span>
lightbox.children[0].addEventListener("click", function(e) {
  setTimeout(() => {
    lightbox.style.display = "none";
  }, 300);
  lightbox.style.opacity = 0;
});

fetchGalleryImages(mockdataPath);

function changeDisplayGrid(e) {
  const displayMode = e.target.classList[e.target.classList.length - 1];
  console.log(e.target.nodeName);
  if (!e.target.classList.contains("selected") && e.target.nodeName !== "DIV") {
    e.target.classList.add("selected");
    e.target.nextElementSibling === null
      ? e.target.previousElementSibling.classList.remove("selected")
      : e.target.nextElementSibling.classList.remove("selected");
    galleryGrid.setAttribute("class", `PhotoGallery__Grid ${displayMode}`);
    fetchGalleryImages(mockdataPath, displayMode);
  }
}

function fetchGalleryImages(path, display = "thumbnail") {
  const { host, protocol } = window.location;
  const url = `${protocol}//${host}/${path}`;
  if (localStorage.getItem("images")) {
    const images = JSON.parse(localStorage.getItem("images"));
    renderGalleryImages(images, display);
  } else {
    fetch(url, {
      method: "GET",
      mode: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      referrer: "no-referrer"
    })
      .then(response => response.json())
      .then(data => {
        const images = data;
        localStorage.setItem("images", JSON.stringify(data));
        renderGalleryImages(images, display);
      })
      .catch(err => console.log(err));
  }
}

function renderGalleryImages(images, display) {
  galleryGrid.innerHTML = "";
  images.forEach(image => {
    galleryGrid.appendChild(createSpinnerFragment());
    setTimeout(() => {
      createImageElement(image, display);
    }, 1000);
  });
}

function createImageElement(image, display) {
  const { thumbnail, url, name, place, caption } = image;
  const fragment = document.createDocumentFragment();

  let View = document.createElement("div");
  View.setAttribute("class", "PhotoGallery__View");

  const imageElement = new Image();

  imageElement.src = display === "thumbnail" ? thumbnail : url;
  imageElement.alt = place;
  imageElement.setAttribute("class", `PhotoGallery__Img ${display}`);

  //The mask to apply visual effects and filters
  let Mask = document.createElement("div");
  Mask.setAttribute("class", "PhotoGallery__Img--mask");
  Mask.style.maxWidth = display === "thumbnail" ? "200px" : "465px";
  const filterIcon = document.createElement("i");
  filterIcon.setAttribute("class", "fas fa-2x fa-filter");
  const filmIcon = document.createElement("i");
  filmIcon.setAttribute("class", "fas fa-2x fa-film");
  Mask.appendChild(filterIcon);
  Mask.appendChild(filmIcon);

  View.appendChild(imageElement);
  View.appendChild(Mask);

  fragment.appendChild(View);

  galleryGrid.removeChild(document.querySelector("div.sk-cube-grid"));
  galleryGrid.appendChild(fragment);
}

function toggleSwitch(e) {
  const checkbox = e.target;
  const label = checkbox.parentElement;
  changeBackgroundTheme(label, checkbox.checked);
}

function changeBackgroundTheme(label, checked) {
  const sunIcon = label.previousElementSibling;
  const moonIcon = label.nextElementSibling;

  if (checked) {
    sunIcon.style.color = "gray";
    moonIcon.style.color = "#fac9b8";
    document.body.style.backgroundColor = "#1e2019";
  } else {
    sunIcon.style.color = "#e4e40c";
    moonIcon.style.color = "gray";
    document.body.style.backgroundColor = "#fafafa";
  }
}

function createSpinnerFragment() {
  const fragment = document.createDocumentFragment();
  const cube = document.createElement("div");
  cube.setAttribute("class", "sk-cube-grid");
  for (let index = 1; index <= 9; index++) {
    let cubeChild = document.createElement("div");
    cubeChild.setAttribute("class", `sk-cube sk-cube${index}`);
    cube.appendChild(cubeChild);
  }
  fragment.appendChild(cube);
  return fragment;
}
