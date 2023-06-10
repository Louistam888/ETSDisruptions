// FUNCTION FOR FETCHING DISRUPTIONS

const fetchDisruptions = async () => {
  try {
    let url;

    if (window.location.pathname === "/currentDisruptions.html") {
      url = new URL("https://data.edmonton.ca/resource/5yvt-mcye.json");
      // https://data.edmonton.ca/resource/5yvt-mcye.json
    } else if (window.location.pathname === "/upcomingDisruptions.html") {
      url = new URL("https://data.edmonton.ca/resource/5yvt-mcye.json");
    }

    url.search = new URLSearchParams({
      $$app_token: app.token,
      $limit: 100000,
    });

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    if (window.location.pathname === "/currentDisruptions.html") {
      document.querySelector(".serviceDisruptions").replaceChildren();
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `Sorry information on service outages is not available at this time, please try again later.`;
      document.querySelector(".serviceDisruptions").append(newLi);

      return error;
    } else if (window.location.pathname === "/upcomingDisruptions.html") {
      document.querySelector(".upcomingServiceDisruptions").replaceChildren();
      const newLi2 = document.createElement("li");
      newLi2.classList.add("apiError");
      newLi2.innerHTML = `Sorry information on service outages is not available at this time, please try again later.`;
      document.querySelector(".upcomingServiceDisruptions").append(newLi2);

      return error;
    }
  }
};
