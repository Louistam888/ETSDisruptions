const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"
app.escalatorEscalatorURL = "https://data.edmonton.ca/resource/snws-u3zx.json"

const convertTime = (timeObj) => { 
  return new Date(timeObj).toLocaleDateString("en-us", {
    year: "numeric",
    month: "short",
    weekday: "long",
    day: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit"
  })
}

//FUNCTION FOR RETRIEVING AND UPDATING CURRENT EDMONTON TIME 
app.refreshTime = () => {
  const timeNow = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"})

  const time = document.querySelector(".time")
  time.innerHTML = `${timeNow}`
}
app.refreshTime()
setInterval(app.refreshTime, 1000)



//FUNCTION FOR RETRIEVING AND UPDATING ESCALTOR OUTAGES EVERY FIVE MINUTES 
app.fetchElevator = () => {
  
  const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Elevator"

  url.search = new URLSearchParams ({
    "$$app_token": app.token
  });

  fetch(url)
    .then((result) => {
      return result.json()
    })
    .then((data)=> {

      document.querySelector(".elevatorOutages").replaceChildren();

      data.forEach((elevatorObj)=>{
        
        const stationName = elevatorObj.lrt_station_name;
        const deviceLocation = elevatorObj.lrt_device_location 
        const device_op_status = elevatorObj.device_op_status;
        const offlineStartDate = convertTime(elevatorObj.since_time_stamp);
        const lastUpdated = convertTime(elevatorObj.polled_time_stamp);

        const newLi = document.createElement("li");
        newLi.classList.add("stationGrid");
        newLi.innerHTML = 

            `<div> 
              ${stationName}
            </div>
            <div> 
              ${deviceLocation}
            </div>
            <div> 
              ${device_op_status}
            </div>
            <div> 
              ${offlineStartDate}
            </div>
            <div> 
              ${lastUpdated}
            </div>`
        
        document.querySelector(".elevatorOutages").append(newLi)

      })
    })
  }

app.fetchElevator()
setInterval(app.fetchElevator, 300000);









//FUNCTION FOR RETRIEVING AND UPDATING ELEVATOR OUTAGES EVERY FIVE MINUTES 
app.fetchEscalator = () => {
  
  const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Escalator"

  url.search = new URLSearchParams ({
    "$$app_token": app.token
  });

  fetch(url)
    .then((result) => {
      return result.json()
    })
    .then((data)=> {

      document.querySelector(".escalatorOutages").replaceChildren();

      data.forEach((escalatorObj)=>{
        
        const stationName = escalatorObj.lrt_station_name;
        const deviceLocation = escalatorObj.lrt_device_location 
        const device_op_status = escalatorObj.device_op_status;
        const offlineStartDate = convertTime(escalatorObj.since_time_stamp);
        const lastUpdated = convertTime(escalatorObj.polled_time_stamp);

        const newLi = document.createElement("li");
        newLi.classList.add("stationGrid");
        newLi.innerHTML = 

            `<div> 
              ${stationName}
            </div>
            <div> 
              ${deviceLocation}
            </div>
            <div> 
              ${device_op_status}
            </div>
            <div> 
              ${offlineStartDate}
            </div>
            <div> 
              ${lastUpdated}
            </div>`
        
        document.querySelector(".escalatorOutages").append(newLi)
      })
    })
  }

app.fetchEscalator()
setInterval(app.fetchEscalator, 300000);


