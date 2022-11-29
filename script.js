const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"

app.urlElevator = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Elevator"
app.urlEscalator = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Escalator"

// const currentTime = (time) => {
//   const convertedTime = time.toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"});
//   return convertedTime;
// }

// currentTime()
// setInterval(currentTime, 1000);


const refreshTime = () => {
  const timeNow = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"})

  const time = document.querySelector(".time")
  time.innerHTML = `${timeNow}`
}

refreshTime()
setInterval(refreshTime, 1000)



