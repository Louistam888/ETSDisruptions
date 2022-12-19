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



//FUNCTION FOR FETCHING ALL DISRUPTIONS

app.fetchDisruptions = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/5yvt-mcye.json"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    const response = await fetch(url);
    const data = await response.json();
  
    return data;

  } catch (error) {
    console.log("error")
  return error
  }
}

const callDisruptions = () => {app.fetchDisruptions().then((disruption) => {
  
  const currentTime = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"numeric", day:"numeric", hour12:false, hour: "numeric", minute:"2-digit", second: "2-digit"})

  const currentTimeUnix = Date.parse(currentTime.replace(",", ""))


//FUNCTION TO FETCH ALL DISRUPTIONS DECLARED IN THE LAST 24 HOURS 
  const filteredArray = disruption.filter((entry)=> {
      const disruptionStart = Date.parse(entry.start_dttm);
      const timeDifference = currentTimeUnix - disruptionStart
  
      if (timeDifference <= 86400000 && timeDifference >= 0) {
        return entry;
      } 
  })

console.log(filteredArray)
console.table(disruption)

})}


callDisruptions()
setInterval(callDisruptions, 100000000)


//FUNCTION FOR FETCHING ELEVATOR OUTAGES 

app.fetchElevator = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Elevator"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    
    const response = await fetch(url);
    const data = await response.json();
    return data;

  } catch (error) {

    document.querySelector(".elevatorOutages").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on elevator outages is not available at the moment. Please try again later`
    document.querySelector(".elevatorOutages").append(newLi)

  return error
  }
}
  
//FUNCTION FOR FETCHING ESCALATOR OUTAGES 

app.fetchEscalator = async () => {
  try {
    const url = "https://data.edmonton.ca/resource/snws-u3zx.json?device_type=Escalator"
    url.search = new URLSearchParams ({
      "$$app_token": app.token
    });
    
    const response = await fetch(url)
    const data = await response.json();
    return data;

  } catch (error) {
    
    document.querySelector(".escalatorOutages").replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `Sorry, information on escalator outages is not available at the moment. Please try again later`
    document.querySelector(".escalatorOutages").append(newLi)
    
    return error
  }
}

const callEleEscPromises = () => { 

  app.fetchElevator().then((elevator)=> {
    if (elevator.length === 0) {
      document.querySelector(".elevatorOutages").replaceChildren();
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All elevators are currently operational`
      document.querySelector(".elevatorOutages").append(newLi)

    } else {

      elevator.forEach((elevatorObj)=>{
          
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
    }
  })

  app.fetchEscalator().then((escalator)=> {
    if (escalator.length === 0) {
      document.querySelector(".escalatorOutages").replaceChildren();
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All escalators are currently operational`
      document.querySelector(".escalatorOutages").append(newLi)
  
    } else {
  
      escalator.forEach((escalatorObj)=>{
          
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
    }
  })
}

callEleEscPromises()
setInterval(callEleEscPromises, 300000)






