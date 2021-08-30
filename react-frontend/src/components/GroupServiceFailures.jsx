import { useState, useEffect } from "react";
// import useIntersectionObserver from "../hooks/useIntersectionObserver";
import DateUtils from "../utils/DateUtils";
import langs from "../config/langs";
import API from "../config/API";
import ServiceLoader from "./ServiceLoader";
import ReactTooltip from "react-tooltip";
import format from "date-fns/format";
import { STATUS_CLASS } from "../utils/meta";
import { calcPer } from "../utils/helper";

const STATUS_TEXT = {
  up: "Uptime",
  down: "Downtime",
  degraded: "Partial degradation",
};

// function secondsToDhms(seconds) {
//   seconds = Number(seconds);
//   var d = Math.floor(seconds / (3600 * 24));
//   var h = Math.floor((seconds % (3600 * 24)) / 3600);
//   var m = Math.floor((seconds % 3600) / 60);
//   var s = Math.floor(seconds % 60);

//   var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
//   var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
//   var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
//   var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
//   return dDisplay + hDisplay + mDisplay + sDisplay;
// }

function formatString(arr) {
  const arrayStr = arr.map((d) => {
    let start_dt = DateUtils.parseISO(d.start);
    let end_dt = DateUtils.parseISO(d.end);
    let duration = DateUtils.duration(
      DateUtils.parseISO(d.start),
      DateUtils.parseISO(d.end)
    );

    return `${start_dt.toLocaleDateString()} - ${
      STATUS_TEXT[d.sub_status]
    } for ${duration}
      (${format(start_dt, "hh:mm aaa")} - ${format(end_dt, "hh:mm aaa")})`;
  });

  return arrayStr.join("<br/>");
}

async function fetchFailureSeries(url) {
  const { now, beginningOf, endOf, nowSubtract, toUnix } = DateUtils;
  const start = beginningOf("day", nowSubtract(86400 * 29));
  const end = endOf("day", now());
  const data = await API.service_failures_data(
    url,
    toUnix(start),
    toUnix(end),
    "24h",
    true
  );
  // console.log(data);
  return data;
  // const data = series.map((s) => ({
  //   ...series,
  //   status: Math.random() > 0.2 ? "up" : "degraded",
  // }));

  // const failureData = [];
  // series.forEach((d) => {
  //   let date = parseISO(d.timeframe);
  //   failureData.push({
  //     month: date.getMonth(),
  //     day: date.getDate(),
  //     date: date,
  //     amount: d.amount,
  //   });
  // });
}

const GroupServiceFailures = ({ group = null, service, collapse }) => {
  // const [containerRef, isVisible] = useIntersectionObserver({
  //   root: null,
  //   rootMargin: "0px",
  //   threshold: 1.0,
  // });

  const [hoverText, setHoverText] = useState("");
  const [loaded, setLoaded] = useState(true);
  const [failureData, setFailureData] = useState([]);
  const [uptime, setUptime] = useState(0);

  useEffect(() => {
    async function fetchData() {
      let url = "/services";
      try {
        if (group) {
          url += `/${group.id}/sub_services/${service.id}/block_series`;
        } else {
          url += `/${service.id}/block_series`;
        }
        const { series, downtime, uptime } = await fetchFailureSeries(url);
        const percentage = calcPer(uptime, downtime);
        setFailureData(series);
        setUptime(percentage);
      } catch (e) {
        console.log(e.message);
      } finally {
        setLoaded(false);
      }
    }
    fetchData();
  }, [service]);

  const handleTooltip = (d, date) => {
    let txt = "";
    if (d.status === "up") {
      txt = `${date} - 100% ${STATUS_TEXT[d.status]}`;
    } else if (d.status === "down" && d.downtimes?.length > 0) {
      txt = formatString(d.downtimes);
    } else if (d.status === "degraded" && d.downtimes?.length > 0) {
      txt = formatString(d.downtimes);
    }
    return txt;
  };

  const handleMouseOver = (d) => {
    let date = DateUtils.parseISO(d.timeframe);
    date = date.toLocaleDateString();
    const tooltipText = handleTooltip(d, date);
    setHoverText(tooltipText);
  };

  const handleMouseOut = () => setHoverText("");

  // const service_txt = () => {
  //   return DateUtils.smallText(service);
  // };

  if (loaded) return <ServiceLoader text="Loading series.." />;

  return (
    // transition div
    <div name="fade" style={{ display: collapse ? "none" : "block" }}>
      <div className="d-flex justify-content-center my-3">
        <ReactTooltip
          effect="solid"
          place="bottom"
          backgroundColor="#344A6C"
          html={true}
        />
        {failureData?.length > 0 ? (
          failureData.map((d, i) => {
            return (
              <div
                className={`flex-fill service_day ${STATUS_CLASS[d.status]}`}
                onMouseOver={() => handleMouseOver(d)}
                onMouseOut={handleMouseOut}
                key={i}
                data-tip={hoverText}
              >
                {d.status !== 0 && (
                  <span className="d-none d-md-block text-center small"></span>
                )}
              </div>
            );
          })
        ) : (
          <span className="description font-10">
            Service does not have any successful hits
          </span>
        )}
      </div>
      <div className="timeline">
        <div className="no-select">
          <p className="divided">
            <span className="timeline-text font-12">
              30 {langs("days_ago")}
            </span>
            <span className="timeline-divider"></span>
            {/* <span className="timeline-text font-12">{service_txt()}</span> */}
            <span className="timeline-text font-12">{uptime}% uptime</span>
            <span className="timeline-divider"></span>
            <span className="timeline-text font-12">{langs("today")}</span>
          </p>
        </div>
      </div>
      {/* <div className="daily-failures small text-right text-dim">
        {hoverText}
      </div> */}
    </div>
  );
};

export default GroupServiceFailures;
