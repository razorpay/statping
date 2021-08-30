// import DateUtils from "./DateUtils";

export function findStatus(data) {
  if (!Array.isArray(data)) return null;
  if (data.length === 0) return null;
  const uptime = data.every((d) => d.online === true);
  const degraded = data.some((d) => d.online === false);
  const downtime = data.every((d) => d.online === false);
  if (uptime) return "uptime";
  if (downtime) return "downtime";
  if (degraded) return "degraded";
  return "none";
}

// export function inRange(message) {
//   return DateUtils.isBetween(
//     DateUtils.now(),
//     message.start_on,
//     message.start_on === message.end_on
//       ? DateUtils.maxDate().toISOString()
//       : message.end_on
//   );
// }

export const isObject = (obj) => {
  if (Object.prototype.toString.call(obj) === "[object Object]") {
    return true;
  }

  return false;
};

export const isObjectEmpty = (obj) => {
  if (isObject(obj) && Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

export const calcPer = (uptime, downtime) => {
  const percentage = ((uptime / (uptime + downtime)) * 100).toFixed(2);
  return percentage;
};
