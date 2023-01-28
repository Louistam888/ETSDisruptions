// FUNCTION TO RENDER ESCALTOR AND ELEVATOR OUTAGES

const renderEscalatorsElevators = () => {
  
  fetchElevator().then((elevator)=> {
    document.querySelector(".elevatorOutages").replaceChildren();
    
    if (elevator.length === 0) {
      document.querySelector(".elevatorOutagesHeader").style.display = "none"
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All elevators are currently operational`;
      document.querySelector(".elevatorOutages").append(newLi);
  
    } else {
  
      elevator.forEach((elevatorObj)=>{

        const stationName = elevatorObj.lrt_station_name;
        const deviceLocation = elevatorObj.lrt_device_location;
        const device_op_status = elevatorObj.device_op_status;
        const offlineStartDate = convertTime(elevatorObj.since_time_stamp)
        const lastUpdated = convertTime(elevatorObj.polled_time_stamp)
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
        
        document.querySelector(".elevatorOutages").append(newLi);
      });
    };
  });
  
  fetchEscalator().then((escalator) => {
    document.querySelector(".escalatorOutages").replaceChildren();  

    if (escalator.length === 0) {
      document.querySelector(".escalatorOutagesHeader").style.display = "none";
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `All escalators are currently operational`;
      document.querySelector(".escalatorOutages").append(newLi);
  
    } else {
  
      escalator.forEach((escalatorObj)=>{
  
        const stationName = escalatorObj.lrt_station_name;
        const deviceLocation = escalatorObj.lrt_device_location; 
        const device_op_status = escalatorObj.device_op_status;
        const offlineStartDate = convertTime(escalatorObj.since_time_stamp);
        const lastUpdated = convertTime(escalatorObj.polled_time_stamp);
    
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

renderEscalatorsElevators();
setInterval(renderEscalatorsElevators, 300000);
