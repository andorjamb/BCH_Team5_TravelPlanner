let cityContainers = document.querySelectorAll(".city-container");
console.log(cityContainers);

cityContainers.forEach((city, i) => {
  city.addEventListener("click", () => console.log(city));
});

const test = (id) => {
  console.log(id);
  let expand = document.querySelector(`.${id}`);
  if ((expand.style.display = "none")) {
    expand.style.display = `grid`;
  } else if ((expand.style.display = "grid")) {
    expand.style.display = "none";
  }
};
