//FUNCTION FOR FETCHING ALL DISRUPTIONS

const fetchAPIs = {}

fetch.fetchDisruptions = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/5yvt-mcye.json"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {
    document.querySelector(".serviceDisruptions").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry information on service outages is not available at this time, please try again later.`
    document.querySelector(".serviceDisruptions").append(newLi)

  return error
  }
}

//FUNCTION FOR FETCHING ELEVATOR OUTAGES 

fetch.fetchElevator = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Elevator"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {

    document.querySelector(".elevatorOutages").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on elevator outages is not available at the moment. Please try again later`
    document.querySelector(".elevatorOutages").append(newLi)

  return error
  }
}
  
//FUNCTION FOR FETCHING ESCALATOR OUTAGES 

fetch.fetchEscalator = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Escalator"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    
    const response = await fetch(url)
    const data = await response.json();
    return data;

  } catch (error) {
    
    document.querySelector(".escalatorOutagesHeader").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on escalator outages is not available at the moment. Please try again later`
    document.querySelector(".escalatorOutagesHeader").append(newLi)
    
    return error
  }
}