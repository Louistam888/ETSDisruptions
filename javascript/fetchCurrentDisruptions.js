// FUNCTION FOR FETCHING DISRUPTIONS 

const fetchCurrentDisruptions = async () => {
  try {
    const url = new URL("https://data.edmonton.ca/resource/5yvt-mcye.json")
    url.search = new URLSearchParams ({
      "$$app_token": app.token,
      "$limit": 100000
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