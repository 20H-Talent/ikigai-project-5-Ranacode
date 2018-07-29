const checkbox = document.querySelector("input[type=checkbox");
let path = "/mockdata/images.json";

checkbox.addEventListener("change", toggleSwitch, false);

renderGalleryImages(path);

function renderGalleryImages(path) {
  const { host, protocol } = window.location;
  const url = `${protocol}//${host}/${path}`;

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
    })
    .catch(err => console.log(err));
}

function toggleSwitch(e) {
  const checkbox = e.target;
  const label = checkbox.parentElement;
  changeBackgroundTheme(label, checkbox.checked);
}

function changeBackgroundTheme(label, checked) {
  const sunIcon = label.previousElementSibling;
  const moonIcon = label.nextElementSibling;

  if (checkbox.checked) {
    sunIcon.style.color = "gray";
    moonIcon.style.color = "#fac9b8";
    document.body.style.backgroundColor = "#1e2019";
  } else {
    sunIcon.style.color = "#e4e40c";
    moonIcon.style.color = "gray";
    document.body.style.backgroundColor = "#fafafa";
  }
}
