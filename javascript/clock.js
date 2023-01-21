//FUNCTION FOR CLOCK IN HEADER 

const refreshTime = () => {

  let t = 0;

  const timeNow = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"}).toString().replace(/,/g, match => ++t === 3 ? ' |' : match)

  const time = document.querySelector(".time")
  time.innerHTML = `${timeNow}`
}

refreshTime()
setInterval(refreshTime, 1000)


//FUNCTION FOR CONVERTING TIME OBJECTS

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