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

// const getValue = (array) => {
//  const value = structuredClone(array)
//  return value
// }
// getValue()
// console.log(getValue)

const copy = (array) => {
  newArray = structuredClone(array)
  console.log(newArray)
  return newArray
}  

fetchBusStopInfo().then((stopsArray)=> {
  const stops = structuredClone(stopsArray)
  copy(stops)
})

console.log(copy)
  // console.log(copy)

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

