window.addEventListener("load", () => {
  document.body.style.overflow = "hidden";

  const delay = () => {
    const loader = document.querySelector(".loader");
    loader.classList.add("loader--hidden");
    document.body.style.overflow = "visible";
    
    }
  setTimeout(delay, 2000);
})
 document.body.style.overflow = "auto";

