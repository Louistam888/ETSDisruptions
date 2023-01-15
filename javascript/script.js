const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"

const convertTime = (timeObj) => { 
  return new Date(timeObj).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    weekday: "short",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  })
}

//FUNCTION FOR FETCHING ALL DISRUPTIONS

app.callAllPromises = () => {

  renderDisruptions();
  renderEscalatorsElevators();

}

app.callAllPromises()
setInterval(app.callAllPromises, 300000)