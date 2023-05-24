//Functions for cleaning up grammar and spelling of entries

const cleanedCause = (cause) => {
  const cleanedCauseInfo = cause.charAt(0).toUpperCase() + cause.slice(1).toLowerCase().replace("_", " ");
  return cleanedCauseInfo;
};

const cleanedEffect = (effect) => {
  const cleanedEffectInfo = effect.replace("_", " ");
  return cleanedEffectInfo;
};

const convertTime = (timeObj) => {
  return luxon.DateTime.fromISO(timeObj).toFormat("ccc. MMM d, yyyy @ h:mm a");
};

const stopArrayTenary = (array) => {
  const tenaryArray = array ? array.split(", ") : "undefined";
  return tenaryArray;
};

const cleanedDescription = (description) => {
  const cleanedDesc = description
    ? description
        .replace("---", "unspecified reasons")
        .replace(/Affected Stops:   Please use:$/, "")
        .replace(/Affected Stops: Please use:$/, "")
        .replace(/Affected Stops:$/, "")
        .replace(/Please use:$/, "")
        .replace(/Use$/, "")
        .replace(/\n$/, "")
        .replace(/\n$/, "")
        .replace(/\n$/, "")
    : "No description provided";

  return cleanedDesc;
};

const cleanedStopInfo = (stop) => {
  let t = 0;
  const cleanedStop = stop.toString().replace(/,/g, (match) => (++t >= 2 ? " " : match));
  return cleanedStop;
};
