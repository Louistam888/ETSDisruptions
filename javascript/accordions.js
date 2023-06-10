//FUNCTION FOR ACTIVATING ACCORIONS ON CLICK

const disruptionAccordions = () => {
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
};

//FUNCTION TO GET ALL ACCORDION HEADERS TO RENDER AT THE SAME HEIGHT

const sameHeights = (resize) => {
  const accordionHeights = document.getElementsByClassName("accordionItemHeader");
  let allHeights = [];

  if (resize === true) {
    [...accordionHeights].forEach((accordionHeight) => {
      accordionHeight.style.height = "auto";
    });
  }

  allHeights = [...accordionHeights].map((accordionHeight) => accordionHeight.clientHeight);

  [...accordionHeights].forEach((accordionHeight) => {
    accordionHeight.style.height = Math.max(...allHeights) + "px";
  });
};
