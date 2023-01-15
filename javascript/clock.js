//FUNCTION FOR RETRIEVING AND UPDATING CURRENT EDMONTON TIME 

const refreshTime = () => {

  const edmontonTime = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"})

  const convertClockTime = (timeObj) => { 
    const dateString = timeObj.split(",")
    const weekday = dateString[0];
    const monthDay = dateString[1];
    const year = dateString[2];
    const time = dateString[3];
    const timeString = `${weekday}. ${monthDay}, ${year} | ${time}`  
   
   return timeString
  
  }
  const timeNow = convertClockTime(edmontonTime)
  // let t = 0;

  // const timeNow = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"}).toString().replace(/,/g, match => ++t === 3 ? ' |' : match)
  
  // const date = new Date();
  // const dateString = date.toLocaleString('en-CA', {
  //   timeZone: "America/Edmonton", year: "numeric", month: "short",
  //   weekday: "long", day: "numeric"
  // });

  // const timeString = date.toLocaleString('en-CA', {
  //     hour: "numeric", minute: "2-digit", second: "2-digit"
  // });

  // const timeNow = `${dateString} | ${timeString}`

  const time = document.querySelector(".time")
  time.innerHTML = `${timeNow}`
}

refreshTime()
setInterval(refreshTime, 1000)


