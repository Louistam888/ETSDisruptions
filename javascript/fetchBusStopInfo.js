const fetchBusStopInfo = async () => {

  try {
    const url = new URL("https://data.edmonton.ca/resource/4vt2-8zrq.json")
    url.search = new URLSearchParams ({
      "$$app_token": app.token,
      "$limit": 100000
    });

    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    return error;
  }
}

const finalList = (array) => {
  newArray = structuredClone(array)
  return newArray
}

let master = [] 
fetchBusStopInfo().then((stopsArray)=> {
  let masterStopList = [];
  for (let i=0; i<stopsArray.length; i++) {
    const entry = {
      stop: stopsArray[i].stop_id,
      stopName: stopsArray[i].stop_name,
    }
    masterStopList.push(entry)
  }

})



// allStops.forEach((stop) => {
  //   masterStopList.push(stop)
  // })
    
  // .filter((item) => {
  //   const stopID = item.stop_id;
    
  //   if (stopID === "undefined") {
  //     return "No affected stops specified"
  //   } else if (stopID == 2793) {
  //     return item
  //   }
  // })
  // console.log(specificStop[0].stop_id)

// console.log(masterStopList)

