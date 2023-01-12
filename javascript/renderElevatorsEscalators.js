const renderElevatorsEscalators = () => {

  fetch.fetchElevator().then((elevator)=> {
    document.querySelector(".elevatorOutages").replaceChildren();
    // const testArray = []

    if (elevator.length === 0) {
      document.querySelector(".stationGridElevator").style.display = "none"
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All elevators are currently operational`
      document.querySelector(".elevatorOutages").append(newLi)

    } else {

      elevator.forEach((elevatorObj)=>{

        let t1 = 0;
        let t2 = 0;
              
        const stationName = elevatorObj.lrt_station_name;
        const deviceLocation = elevatorObj.lrt_device_location 
        const device_op_status = elevatorObj.device_op_status;
        const offlineStartDate = app.convertTime(elevatorObj.since_time_stamp).replace(/,/g, match => ++t1 === 3 ? ' @' : match);
        const lastUpdated = app.convertTime(elevatorObj.polled_time_stamp).replace(/,/g, match => ++t2 === 3 ? ' @' : match);;
        const newLi = document.createElement("li");
        newLi.classList.add("stationGridElevator");
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

  fetch.fetchEscalator().then((escalator)=> {

    document.querySelector(".escalatorOutages").replaceChildren();  

    // let test = []

    if (escalator.length === 0) {
      document.querySelector(".stationGridEscalator").style.display = "none"
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All escalators are currently operational`
      document.querySelector(".escalatorOutages").append(newLi)

    } else {

      escalator.forEach((escalatorObj)=>{

        let t1 = 0;
        let t2 = 0;
          
        const stationName = escalatorObj.lrt_station_name;
        const deviceLocation = escalatorObj.lrt_device_location 
        const device_op_status = escalatorObj.device_op_status;
        const offlineStartDate = app.convertTime(escalatorObj.since_time_stamp).replace(/,/g, match => ++t1 === 3 ? ' @' : match);;
        const lastUpdated = app.convertTime(escalatorObj.polled_time_stamp).replace(/,/g, match => ++t2 === 3 ? ' @' : match);;
    
        const newLi = document.createElement("li");
        newLi.classList.add("stationGridEscalator");
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