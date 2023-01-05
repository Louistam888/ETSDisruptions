const app = {};

app.token = "J33yX1FYA0vwnOA36tGBFLd6l"
// app.escalatorEscalatorURL = "https://data.edmonton.ca/resource/snws-u3zx.json"

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

  let t = 0

  const timeNow = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"short", weekday: "long", day:"numeric", hour12:true, hour: "numeric", minute:"2-digit", second: "2-digit"}).replace(/,/g, match => ++t === 3 ? ' |' : match)

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

const callAllPromises = () => {

  app.fetchDisruptions().then((disruption) => {

    console.log("fetched")

    document.querySelector(".serviceDisruptions").replaceChildren();
  
    const currentTime = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"numeric", day:"numeric", hour12:false, hour: "numeric", minute:"2-digit", second: "2-digit"})
    const currentTimeUnix = Date.parse(currentTime.replace(",", ""))
  
    const filteredArray = disruption.filter((entry)=> {
        const disruptionStart = Date.parse(entry.start_dttm);
        const disruptionEnd = Date.parse(entry.end_dttm) 
           
        if (currentTimeUnix >= disruptionStart && currentTimeUnix <= disruptionEnd) {
          return entry;
        } 
    })
 
    
    filteredArray.sort(function (a,b) {
      if (a.route_id < b.route_id) return -1;
      if (a.route_id > b.route_id) return 1;
      return 0;
    })

    filteredArray.forEach((log)=> {

      // console.table(log)

      const route = log.route_id;
      const routeName = log.route_long_name;
      const cause = log.cause;
      const effect = log.effect;
      const description = log.description_text; 
      const shortDescription = log.header_text;
      const start = convertTime(log.start_dttm);
      const end = convertTime(log.end_dttm);
      const stop = log.stop_id
      
      const newLi = document.createElement("li");
      newLi.classList.add("disruptionsHeader");
      newLi.innerHTML = 
        
        `<div class="accordion">
          <div class="accordionItem">
            <div class="accordionItemHeader">
              ${route  
                ? route
                : shortDescription
              }
              ${routeName
                ? routeName
                : ""
              }
              ${effect
                ? effect
                : ""
              }
          
            </div>
            <div class="accordionItemBody">
              <div class="accordionContent">
                <div>
                  ${description
                    ? description 
                    : "Information not available"}
                </div>
                <div class="doubleInfoContainer">
                    ${cause
                    ? `<div class="doubleLeft">
                        CAUSE:
                      </div>
                      <div class="doubleRight">
                        ${cause}
                      </div>
                     `
                    : "No cause specified"}
                </div>
                <div class="doubleInfoContainer">
                  ${start
                    ? `<div class="doubleLeft">
                        DISRUPTION START:
                      </div>
                      <div class="doubleRight">
                        ${start}
                      </div>`
                    : "No disruption start time specifed"}
                </div>
                <div class="doubleInfoContainer">
                  ${end
                    ? `<div class="doubleLeft">
                        DISRUPTION END:
                      </div>
                      <div class="doubleRight">
                        ${end}
                      </div>`
                    : "No disruption end time specifed"}
              </div>
              </div><!--accordionContent div end -->
            </div> <!--accordionitembody div end-->
          </div><!--accordionItem div end-->
        </div><!--accordion div end-->`
        
      document.querySelector(".serviceDisruptions").append(newLi)
    })

    const accordionItemHeader = document.querySelectorAll(".accordionItemHeader");
    accordionItemHeader.forEach(header => {
   
      header.addEventListener("click", (event) => {
        header.classList.toggle("active");
        console.log("clicked")
      
        const accordionItemBody = header.nextElementSibling;
   
        if (header.classList.contains("active")) {    
          accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + "px";  
        } else {
          accordionItemBody.style.maxHeight = 0;
        }
      });
    });

  })


  app.fetchElevator().then((elevator)=> {
    document.querySelector(".elevatorOutages").replaceChildren();

    if (elevator.length === 0) {
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
  
    document.querySelector(".escalatorOutages").replaceChildren();

    if (escalator.length === 0) {
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

callAllPromises()
setInterval(callAllPromises, 60000)
