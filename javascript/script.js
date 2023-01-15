const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"

const convertTime = (timeObj) => { 
  const dateString = new Date(timeObj).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    weekday: "short",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  }).split(",")

  const weekday = dateString[0];
  const monthDay = dateString[1];
  const year = dateString[2];
  const time = dateString[3];
  const timeString = `${weekday}. ${monthDay}, ${year} @ ${time}`  
  
  return timeString
}

//FUNCTION FOR FETCHING ALL DISRUPTIONS

app.callAllPromises = () => {

  renderDisruptions();
  renderEscalatorsElevators();

}

app.callAllPromises()
setInterval(app.callAllPromises, 300000)
