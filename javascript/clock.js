//FUNCTION FOR CLOCK IN HEADER 

const refreshTime = () => {

  const timeNow = luxon.DateTime.now().setZone("America/Edmonton").toFormat("cccc, MMM d, yyyy | h:mm:ss a");
  const time = document.querySelector(".time");
  time.innerHTML = `${timeNow}`;

}
refreshTime();
setInterval(refreshTime, 1000);


//FUNCTION FOR CONVERTING TIME OBJECTS

const convertTime = (timeObj) => { 
  return luxon.DateTime.fromISO(timeObj).toFormat("ccc. MMM d, yyyy @ h:mm a");
}


//FUNCTIONS FOR CONVERTING CURRENT TIME TO UNIX TIME 

const currentTime = (new Date).toLocaleString('en-CA', {
  timeZone: "America/Edmonton", 
  year:"numeric", month:"numeric", 
  day:"numeric", hour12:false, 
  hour: "numeric", 
  minute:"2-digit", 
  second: "2-digit"
});

const currentTimeUnix = Date.parse(currentTime.replace(",", ""));