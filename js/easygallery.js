const checkbox = document.querySelector("input[type=checkbox");

checkbox.addEventListener("change", toggleSwitch, false);
function toggleSwitch(e) {
  const checkbox = e.target;
  const label = checkbox.parentElement;
  const sunIcon = label.previousElementSibling;
  const moonIcon = label.nextElementSibling;

  if (checkbox.checked) {
    sunIcon.style.color = "gray";
    moonIcon.style.color = "#055199";
    document.body.style.backgroundColor = "#1e2019";
  } else {
    sunIcon.style.color = "#e4e40c";
    moonIcon.style.color = "gray";
    document.body.style.backgroundColor = "#fafafa";
  }
}
