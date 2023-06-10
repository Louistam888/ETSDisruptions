//SET PAGE CLASS FOR DISRUPTIONS UL ON EACH PAGE
let pageClass;

//FUNCTION FOR SORTING CURRENT DISRUPTIONS

const getEntry = (disruption, currentTimeUnix) =>
  disruption.filter((entry) => {
    const disruptionStart = Date.parse(entry.start_dttm);
    const disruptionEnd = Date.parse(entry.end_dttm);
    const startCounting = currentTimeUnix + 300;
    const route = entry.route_id;

    if (window.location.pathname === "/currentDisruptions.html") {
      pageClass = ".serviceDisruptions";
      if (currentTimeUnix >= disruptionStart && currentTimeUnix <= disruptionEnd && route !== undefined) {
        return entry;
      }
    } else if (window.location.pathname === "/upcomingDisruptions.html") {
      pageClass = ".upcomingServiceDisruptions";
      if (disruptionStart >= startCounting && route !== undefined) {
        return entry;
      }
    }
  });

//FUNCTION TO RENDER UPCOMING DISRUPTIONS

const renderDisruptions = async () => {
  const busStopsInfo = await fetchBusStopInfo();
  const disruptions = await fetchDisruptions();

  const filteredArrayRaw = getEntry(disruptions, currentTimeUnix);
  const filteredArray = filteredArrayRaw
    .sort((a, b) => {
      if ((a.start_dttm ?? Number.MAX_VALUE) > (b.start_dttm ?? Number.MAX_VALUE)) return -1;
      if ((a.start_dttm ?? Number.MAX_VALUE) < (b.start_dttm ?? Number.MAX_VALUE)) return 1;
      return 0;
    })
    .reduce((accumulator, current) => {
      if (
        !accumulator.find(
          (item) =>
            item.description_text.replace(/ \nUse$/, "") === current.description_text.replace(/ \nUse$/, "") &&
            item.stop_id === current.stop_id &&
            item.route_id === current.route_id
        )
      ) {
        accumulator.push(current);
      }

      return accumulator;
    }, [])
    .sort((a, b) => {
      if ((a.route_id ?? Number.MAX_VALUE) < (b.route_id ?? Number.MAX_VALUE)) return -1;
      if ((a.route_id ?? Number.MAX_VALUE) > (b.route_id ?? Number.MAX_VALUE)) return 1;
      return 0;
    });

  if (filteredArray.length === 0) {
    document.querySelector(pageClass).replaceChildren();
    const newLi = document.createElement("li");
    newLi.classList.add("apiError");
    newLi.innerHTML = `There are no current service disruptions`;
    document.querySelector(pageClass).append(newLi);
  } else {
    document.querySelector(pageClass).replaceChildren();

    filteredArray.forEach((log) => {
      const route = log.route_id;
      const routeName = log.route_long_name;
      const cause = cleanedCause(log.cause);
      const effect = cleanedEffect(log.effect);
      const shortDescription = log.header_text;
      const start = convertTime(log.start_dttm);
      const end = convertTime(log.end_dttm);
      const stopArray = stopArrayTenary(log.stop_id);
      const stopDetails = createStopString(stopArray, busStopsInfo);
      const stopInfo = cleanedStopInfo(stopDetails);
      const description = cleanedDescription(log.description_text);
      const newLi = document.createElement("li");
      newLi.classList.add("disruptionsHeader");
      newLi.innerHTML = `<div class="accordion">
          <div class="accordionItem">
            <div class="accordionItemHeader">
              ${route ? route : shortDescription}
              ${routeName ? routeName : ""}
              ${effect ? (effect === "UNKNOWN EFFECT" ? "" : effect) : ""}
            </div>
            <div class="accordionItemBody">
              <div class="accordionContent">
                <div class="briefDescription">
                  ${description ? description : "Information not available"}
                </div><!--briefDescription div end-->
                <div class="doubleInfoContainer">
                    ${
                      cause
                        ? `<div class="doubleLeft">
                        CAUSE
                      </div><!--doubleLeft div end -->
                      <div class="doubleRight">
                        ${cause}
                      </div>` // <!--doubleRight div end-->
                        : "No cause specified"
                    }
                </div><!--doubleInfoContainer div end -->
                <div class="doubleInfoContainer">
                  ${
                    start
                      ? `<div class="doubleLeft">
                        DISRUPTION START
                      </div><!--doubleLeft div end -->
                      <div class="doubleRight">
                        ${start}
                      </div>` // <!--doubleRight div end-->
                      : "No disruption start time specifed"
                  }
                </div><!--doubleInfoContainer div end -->
                <div class="doubleInfoContainer">
                  ${
                    end
                      ? `<div class="doubleLeft">
                        DISRUPTION END
                      </div><!--doubleLeft div end -->
                      <div class="doubleRight">
                        ${end}
                      </div>` // <!--doubleRight div end-->
                      : "No disruption end time specifed"
                  }
                </div><!--doubleInfoContainer div end -->
                <div class="doubleInfoContainer">            
                  <div class="doubleLeft">
                    STOP LOCATION(S)
                  </div><!--doubleRight div end-->
                  <div class="doubleRight stop">
                    ${stopInfo}
                  </div><!--doubleRight stop div end-->
                </div><!--doubleInfoContainer div end -->
              </div><!--accordionContent div end -->
            </div> <!--accordionitembody div end-->
          </div><!--accordionItem div end-->
        </div><!--accordion div end-->`;
      document.querySelector(pageClass).append(newLi);
    });
    sameHeights(false);
    window.onresize = () => {
      sameHeights(true);
    };
    disruptionAccordions();
  }
};

renderDisruptions();
setInterval(renderDisruptions, 300000);
