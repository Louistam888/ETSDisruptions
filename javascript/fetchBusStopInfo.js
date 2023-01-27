const fetchBusStopInfo = async () => {

  try {
    const url = new URL("https://data.edmonton.ca/resource/4vt2-8zrq.json")
    url.search = new URLSearchParams ({
      "$$app_token": app.token,
      "$limit": 100000
    });

    const response = await fetch(url);
    const data = await response.json();

    return data.map(({ stop_id, stop_name }) => ({
    id: stop_id,
    name: stop_name
    }));
  } catch (error) {
    console.log(error)
    return error
  }
};

  