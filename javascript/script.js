const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"

app.convertTime = (timeObj) => { 
  return new Date(timeObj).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit"
  })
}

app.callAllPromises = () => {

  renderDisruptions();
  renderElevatorsEscalators();  
}

app.callAllPromises()
setInterval(app.callAllPromises, 300000)
