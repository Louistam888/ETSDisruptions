const renderUpcomingDisruptions = () => {

  const currentTime = (new Date).toLocaleString('en-CA', {timeZone: "America/Edmonton", year:"numeric", month:"numeric", day:"numeric", hour12:false, hour: "numeric", minute:"2-digit", second: "2-digit"})
  const currentTimeUnix = Date.parse(currentTime.replace(",", ""))

  fetchUpcomingDisruptions().then((disruption) => {
  console.log(disruption)

    const filteredArrayUpcomingRaw = disruption.filter((entry)=> {
      const disruptionStart = Date.parse(entry.start_dttm);
      const startCounting = currentTimeUnix + 300 
      const route = entry.route_id
  
      console.log(currentTimeUnix)

      if (disruptionStart >= startCounting && route !== undefined) {
        return entry;
      } 
    })
    console.log(filteredArrayUpcomingRaw)
      
    const filteredArrayUpcoming = filteredArrayUpcomingRaw.sort((a,b) => {
      
      if ((a.start_dttm ?? Number.MAX_VALUE) > (b.start_dttm ?? Number.MAX_VALUE)) return -1;
      if ((a.start_dttm ?? Number.MAX_VALUE) < (b.start_dttm ?? Number.MAX_VALUE)) return 1;
      return 0;
    }).reduce((accumulator, current) => {

      if (!accumulator.find((item) => (item.description_text === current.description_text && item.stop_id === current.stop_id && item.route_id === current.route_id))) {

        accumulator.push(current);

      } 

      return accumulator;
    }, []).sort((a,b) => {
      
      if ((a.route_id ?? Number.MAX_VALUE) < (b.route_id ?? Number.MAX_VALUE)) return -1;
      if ((a.route_id ?? Number.MAX_VALUE) > (b.route_id ?? Number.MAX_VALUE)) return 1;
      return 0;
    })


    if (filteredArrayUpcoming.length === 0 ) {
      document.querySelector(".upcomingServiceDisruptions").replaceChildren();
      const newLi = document.createElement("li");
      newLi.classList.add("apiError");
      newLi.innerHTML = `There are no planned service disruptions in the near future`
      document.querySelector(".upcomingServiceDisruptions").append(newLi)
    } else { 
      document.querySelector(".upcomingServiceDisruptions").replaceChildren();
      
      filteredArrayUpcoming.forEach((log)=> {
        // console.log(log.stop_id_multipoint.coordinates[0][1])
        //  console.log(log.stop_id_multipoint)
      
        let t1 = 0;
        let t2 = 0;
    
        const route = log.route_id;
        const routeName = log.route_long_name;
        const causeRaw = log.cause;
        const cause = causeRaw.charAt(0).toUpperCase()+causeRaw.slice(1).toLowerCase().replace("_", " ");
        const effect = log.effect.replace("_", " ");
        const shortDescription = log.header_text;
        const start = convertTime(log.start_dttm).replace(/,/g, match => ++t1 === 3 ? ' @' : match);
        const end = convertTime(log.end_dttm).replace(/,/g, match => ++t2 === 3 ? ' @' : match);
        const stop = log.stop_id;
        const description = log.description_text.replace(/(\r\n|\n|\r)/gm, "").replace("---", "unspecified reasons").replace(/Affected Stops: Please use:$/, "").replace(/Please use:$/, "").replace(/Affected Stops:$/, "")

    
        // const coordObj = log.stop_id_multipoint;


        const newLi = document.createElement("li");
        newLi.classList.add("upcomingDisruptionsHeader");
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
                } --- Starting
                ${
                  start
                }
            
              </div>
              <div class="accordionItemBody">
                <div class="accordionContent">
                  <div class="briefDescription">
                    ${description
                      ? description 
                      : "Information not available"}
                  </div>
                  <div class="doubleInfoContainer">
                      ${cause
                      ? `<div class="doubleLeft">
                          CAUSE
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
                          DISRUPTION START
                        </div>
                        <div class="doubleRight">
                          ${start}
                        </div>`
                      : "No disruption start time specifed"}
                  </div>
                  <div class="doubleInfoContainer">
                    ${end
                      ? `<div class="doubleLeft">
                          DISRUPTION END
                        </div>
                        <div class="doubleRight">
                          ${end}
                        </div>`
                      : "No disruption end time specifed"}
                  </div>
                  <div class="doubleInfoContainer">
                      ${stop
                      ? `<div class="doubleLeft">
                        STOP(S) AFFECTED
                      </div>
                      <div class="doubleRight">
                        ${stop}
                      </div>`
                      : "No affected stops specified"}
                  </div>
                </div><!--accordionContent div end -->
              </div> <!--accordionitembody div end-->
            </div><!--accordionItem div end-->
          </div><!--accordion div end-->`
        document.querySelector(".upcomingServiceDisruptions").append(newLi)
      })
      sameHeights(false);
      window.onresize = () => {
        sameHeights(true)
      }
      disruptionAccordions();
    }
  })
}

renderUpcomingDisruptions();
setInterval(renderUpcomingDisruptions, 300000)
