const accordions = {}

//FUNCTION FOR ACTIVATING ACCORIONS ON CLICK 

accordions.disruptionAccordions = () => {
  
  const accordionItemHeader = document.querySelectorAll(".accordionItemHeader");
  accordionItemHeader.forEach((header) => {
  
    header.addEventListener("click", (event) => {
      header.classList.toggle("active");
    
      const accordionItemBody = header.nextElementSibling;
  
      if (header.classList.contains("active")) {    
        accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";  
      } else {
        accordionItemBody.style.maxHeight = 0;
      }
    });
  });
}

//FUNCTION TO GET ALL ACCORDION HEADERS TO RENDER AT THE SAME HEIGHT WHEN SCREEN SIZE CHANGES

accordions.sameHeights = (resize) => {
  const accordionHeights = document.getElementsByClassName("accordionItemHeader")
  let allHeights = []

  if (resize === true) {
    for (let i = 0; i < accordionHeights.length; i++) {
      accordionHeights[i].style.height = "auto";
    }
  }

  for (let i = 0; i < accordionHeights.length; i++) {
    const height = accordionHeights[i].clientHeight
    allHeights.push(height)
  }
  
  for (let i = 0; i < accordionHeights.length; i++) {
    accordionHeights[i].style.height = Math.max(...allHeights) + "px";
  }
}