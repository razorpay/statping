import {
  faCheckCircle,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

import indiaFlagSvg from "../components/Navbar/images/india-flag.svg";
import usFlagSvg from "../components/Navbar/images/us-flag.svg";

export const STATUS_COLOR = {
  uptime: "#5ebe5b",
  downtime: "#d50a0a",
  degraded: "#e4951d",
};

export const STATUS_ICON = {
  uptime: faCheckCircle,
  downtime: faExclamationCircle,
  degraded: faExclamationCircle,
};

export const STATUS_TEXT = {
  uptime: "All services are up and running",
  downtime: "Multiple services are down",
  degraded: "Some services are impacted",
};

export const STATUS_CLASS = {
  up: "uptime",
  degraded: "degraded",
  down: "downtime",
};

export const REGIONS = {
  IN: {
    flag: indiaFlagSvg,
    flagTooltip: "Razorpay is currently available only for Indian businesses",
    pageTitle: "Razorpay - Status Page",
    headerTitle: "Razorpay Status Page",
    headerDescription:
      "Razorpay status page publishes the most up-to-the-minute information on product availability. Check back here any time to get current status/information on individual products. If you are experiencing a real-time, operational issue with one of our products that is not described below, please reach out to",
    supportUrl: "https://razorpay.com/support/",
    sectionTitle: "Razorpay Payments",
    logoUrl: "https://razorpay.com/",
    loginUrl: "https://dashboard.razorpay.com/#/access/signin",
    signupUrl: "https://dashboard.razorpay.com/signup",
  },
  US: {
    flag: usFlagSvg,
    flagTooltip: "Razorpay US is available for businesses in the United States",
    pageTitle: "Razorpay US - Status Page",
    headerTitle: "Razorpay US Status Page",
    headerDescription:
      "Razorpay US status page publishes the most up-to-the-minute information on product availability. Check back here any time to get current status/information on individual products. If you are experiencing a real-time, operational issue with one of our products that is not described below, please reach out to",
    supportUrl: "https://razorpay.com/us/support/",
    sectionTitle: "Razorpay US Payments",
    logoUrl: "https://razorpay.com/us/",
    loginUrl: "https://dashboard.razorpay.com/us/#/access/signin",
    signupUrl: "https://dashboard.razorpay.com/us/signup",
  },
};

export const REGION = REGIONS[process.env.REACT_APP_REGION || "IN"];
