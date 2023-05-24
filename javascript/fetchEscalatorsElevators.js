//FUNCTION FOR FETCHING ELEVATOR OUTAGES

const fetchElevator = async () => {
  try {
    const url = new URL("https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Elevator");
    url.search = new URLSearchParams({
      $$app_token: app.token,
      $limit: 100000,
    });

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    document.querySelector(".elevatorOutagesHeader").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on elevator outages is not available at the moment. Please try again later`;
    document.querySelector(".elevatorOutagesHeader").append(newLi);

    return error;
  }
};

//FUNCTION FOR FETCHING ESCALATOR OUTAGES

const fetchEscalator = async () => {
  try {
    const url = new URL("https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Escalator");
    url.search = new URLSearchParams({
      $$app_token: app.token,
    });

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    document.querySelector(".escalatorOutagesHeader").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on escalator outages is not available at the moment. Please try again later`;
    document.querySelector(".escalatorOutagesHeader").append(newLi);

    return error;
  }
};
