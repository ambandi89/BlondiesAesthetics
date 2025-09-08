const hamMenu = document.querySelector(".ham-menu");

const offScreenMenu = document.querySelector(".off-screen-menu");

hamMenu.addEventListener("click", () => {
  hamMenu.classList.toggle("active");
  offScreenMenu.classList.toggle("active");
});

const toggles = document.querySelectorAll(".services-toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    toggle.parentNode.classList.toggle("active");
  })
})

let scrollContainer = document.querySelector(".gallery");
let backBtn = document.getElementById("backBtn");
let nextBtn = document.getElementById("nextBtn");

scrollContainer.addEventListener("wheel", (evt) => {
    evt.preventDefault();
    scrollContainer.scrollLeft += evt.deltaY;
    scrollContainer.style.scrollBehavior = "auto";
});

nextBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft += 300;
});

backBtn.addEventListener("click", ()=>{
    scrollContainer.style.scrollBehavior = "smooth";
    scrollContainer.scrollLeft -= 300;
});

// hover effect
// new hoverEffect({
// parent: document.querySelector(".distortion"),
// intensity: 0.2,
// image1: 'img/pexels-n-voitkevich-7077850.jpg',
// image2: 'img/pexels-n-voitkevich-7077807.jpg',
// displacementImage: 'img/heightMap.png',
// });


document.addEventListener("DOMContentLoaded", function () {
    new hoverEffect({
      parent: document.querySelector(".distortion"),
      intensity: 0.2,
      image1: 'img/pexels-n-voitkevich-7077850.jpg',
      image2: 'img/pexels-n-voitkevich-7077807.jpg',
      displacementImage: 'img/heightMap.png',
    });
  });
