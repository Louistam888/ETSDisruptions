const fetchUpcomingDisruptions = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/5yvt-mcye.json"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {
  
    document.querySelector(".upcomingServiceDisruptions").replaceChildren();
    const newLi2 = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry information on service outages is not available at this time, please try again later.`
    document.querySelector(".upcomingServiceDisruptions").append(newLi2)

  return error
  }
}

