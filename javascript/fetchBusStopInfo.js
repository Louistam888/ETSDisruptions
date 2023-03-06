const fetchBusStopInfo = async () => {

  try {
    const url = new URL("https://data.edmonton.ca/resource/4vt2-8zrq.json")
    url.search = new URLSearchParams ({
      "$$app_token": app.token,
      "$limit": 100000
    });

    const response = await fetch(url);
    const data = await response.json();

    return data.map(({ stop_id, stop_name, stop_lat, stop_lon }) => ({
    id: stop_id,
    name: stop_name,
    stopLat: stop_lat,
    stopLong: stop_lon
    }));
  } catch (error) {
    return [""];
  };
};

const createStopString = (array1, array2) => {
  let stopList = []
  if (array1 !== "undefined") {
    for (let i=0; i<array1.length; i++) {
      let match = false; 

      for (let j=0; j<array2.length; j++) {
        if (array1[i] === array2[j].id) {
          const intersection = array2[j].name
          ? array2[j].name
          : "";
          const lat = array2[j].stopLat 
          ? array2[j].stopLat
          : "";
          const long = array2[j].stopLong
          ? array2[j].stopLong
          : "";
          const stop = `<a href="https://www.google.com/maps?q=${lat},${long}" target="_blank">${array2[j].id}</a>`;
          const stopString = `${stop} (${intersection}) <br>`;

          match = true;
          stopList.push(stopString);
          
          continue;
          
        } else if (j === (array2.length - 1) && array1[i] !== array2[j].id && match === false) {
    
          const stopString = `${array1[i]} (Stop location info not available)`;
          stopList.push(stopString);
        };
      };
    };
  } else if ( array1 === "undefined") {
    const stopString = "Stop location info not available";
    stopList.push(stopString);
  }
  return stopList;
}


  