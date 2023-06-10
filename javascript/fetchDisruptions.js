//SET PAGE CLASS FOR DISRUPTIONS UL ON EACH PAGE
let errorPage;

// FUNCTION FOR FETCHING DISRUPTIONS
const fetchDisruptions = async () => {
  try {
    let url;

    if (window.location.pathname === "/currentDisruptions.html") {
      errorPage = ".serviceDisruptions";
      url = new URL("https://data.edmonton.ca/resource/5yvt-mcye.json");
    } else if (window.location.pathname === "/upcomingDisruptions.html") {
      errorPage = ".upcomingServiceDisruptions";
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
    document.addEventListener("DOMContentLoaded", () => {
      document.querySelector(errorPage).replaceChildren();
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `Sorry information on service outages is not available at this time, please try again later.`;
      document.querySelector(errorPage).append(newLi);

      return error;
    });
  }
};
