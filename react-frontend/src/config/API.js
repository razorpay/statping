import axios from "axios";
import { hits_data, incidents, ping_data } from "../utils/data";

const qs = require("querystring");
axios.defaults.baseURL = `${process.env.REACT_APP_API}/api`;
// axios.defaults.withCredentials = true;

const tokenKey = "statping_auth";

class Api {
  constructor() {
    this.version = "0.90.74";
    this.commit = "df8e1f73d9f7fdf218bc5c26130d7d8a6af6719a";
  }

  async oauth() {
    const oauth = axios.get("api/oauth").then((response) => response.data);
    return oauth;
  }

  async core() {
    const core = axios.get("api").then((response) => response.data);
    // const core = {
    //   allow_reports: true,
    //   commit: "2352cae85cb388437ae848c6acd0a658a4cd2d84",
    //   created_at: "2021-08-18T19:03:50.948350158Z",
    //   description: "This status page has sample data included",
    //   domain: "http://localhost:8080",
    //   footer: "",
    //   language: "en",
    //   migration_id: 1629313430,
    //   name: "Statping Sample Data",
    //   setup: true,
    //   started_on: "2021-08-18T19:04:44.943630138Z",
    //   updated_at: "2021-08-18T19:04:42.046324648Z",
    //   using_cdn: false,
    //   version: "0.90.74",
    // };
    // if (core.allow_reports) {
    //   await this.sentry_init();
    // }
    return core;
  }

  async core_save(obj) {
    return axios.post("api/core", obj).then((response) => response.data);
  }

  async oauth_save(obj) {
    return axios.post("api/oauth", obj).then((response) => response.data);
  }

  async setup_save(data) {
    return axios
      .post("api/setup", qs.stringify(data))
      .then((response) => response.data);
  }

  async services() {
    // return axios.get("api/services").then((response) => response.data);
    const services = [
      {
        avg_response: 759911,
        check_interval: 10,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 51,
        group_id: 1,
        id: 1,
        incidents: [],
        last_error: "2021-08-24T08:54:06.743672422Z",
        last_success: "2021-08-25T07:38:24.799297216Z",
        latency: 250537,
        messages: [
          {
            id: 1,
            title: "Routine Downtime",
            description: "This is an example a upcoming message for a service!",
            start_on: "2021-08-18T19:18:51.246083269Z",
            end_on: "2021-08-18T21:03:51.246083592Z",
            service: 1,
            notify_users: null,
            notify_method: "",
            notify_before: null,
            notify_before_scale: "",
            created_at: "2021-08-18T19:03:51.24638352Z",
            updated_at: "2021-08-18T19:03:51.24638352Z",
          },
        ],
        name: "Google",
        online: true,
        online_24_hours: 99.41,
        online_7_days: 99.46,
        order_id: 1,
        permalink: "google",
        ping_time: 5230,
        public: true,
        stats: {
          failures: 414,
          hits: 64991,
          first_hit: "2021-08-15T19:03:54.554047231Z",
        },
        status_code: 200,
        updated_at: "2021-08-18T19:03:51.043602378Z",
      },
      {
        avg_response: 937152,
        check_interval: 30,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 401,
        group_id: 0,
        id: 2,
        incidents: [],
        last_error: "2021-09-04T06:18:51.353238056Z",
        last_success: "2021-08-25T07:38:14.943545035Z",
        latency: 198342,
        messages: [],
        name: "Statping Github",
        online: true,
        online_24_hours: 86.05,
        online_7_days: 98,
        order_id: 2,
        permalink: "statping_github",
        ping_time: 4986,
        public: true,
        stats: {
          failures: 403,
          hits: 27420,
          first_hit: "2021-08-15T19:04:05.648890845Z",
        },
        status_code: 200,
        updated_at: "2021-08-18T19:03:51.048271038Z",
      },
      {
        avg_response: 939845,
        check_interval: 60,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 401,
        group_id: 2,
        id: 3,
        incidents: [],
        last_error: "2021-09-14T00:13:51.353238056Z",
        last_success: "2021-08-25T07:37:47.443997184Z",
        latency: 2199869,
        messages: [
          {
            id: 2,
            title: "Server Reboot",
            description:
              "This is another example a upcoming message for a service!",
            start_on: "2021-08-18T19:18:51.249974522Z",
            end_on: "2021-08-18T21:03:51.249974753Z",
            service: 3,
            notify_users: null,
            notify_method: "",
            notify_before: null,
            notify_before_scale: "",
            created_at: "2021-08-18T19:03:51.25014047Z",
            updated_at: "2021-08-18T19:03:51.25014047Z",
          },
        ],
        name: "JSON Users Test",
        online: true,
        online_24_hours: 72.13,
        online_7_days: 96.26,
        order_id: 3,
        permalink: "",
        ping_time: 599802,
        public: true,
        stats: {
          failures: 403,
          hits: 18033,
          first_hit: "2021-08-15T19:04:14.447195992Z",
        },
        status_code: 200,
        updated_at: "2021-08-18T19:03:51.053036472Z",
      },
      {
        avg_response: 873686,
        check_interval: 30,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 401,
        group_id: 2,
        id: 4,
        incidents: [
          {
            id: 1,
            title: "Github Issues",
            description:
              "There are new features for Statping, if you have any issues please visit the Github Repo.",
            service: 4,
            created_at: "2021-08-18T19:04:41.550901129Z",
            updated_at: "2021-08-18T19:04:41.550901129Z",
            updates: [
              {
                id: 1,
                message: "Github seems be be having an issue right now.",
                type: "investigating",
                created_at: "2021-08-18T18:04:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.747486943Z",
              },
              {
                id: 2,
                message:
                  "Problem is continuing and we are looking at the issue.",
                type: "update",
                created_at: "2021-08-18T18:34:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.750551419Z",
              },
              {
                id: 3,
                message: "Github is now back online and everything is working.",
                type: "Resolved",
                created_at: "2021-08-18T18:59:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.754333488Z",
              },
            ],
          },
        ],
        last_error: "2021-08-23T23:25:31.310668804Z",
        last_success: "2021-08-25T07:38:16.143738468Z",
        latency: 1197622,
        messages: [],
        name: "JSON API Tester",
        online: true,
        online_24_hours: 86.05,
        online_7_days: 94.9,
        order_id: 4,
        permalink: "",
        ping_time: 201980,
        public: true,
        stats: {
          failures: 997,
          hits: 26830,
          first_hit: "2021-08-15T19:04:22.650994346Z",
        },
        status_code: 201,
        updated_at: "2021-08-18T19:03:51.05898069Z",
      },
      {
        avg_response: 315403,
        check_interval: 20,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 0,
        group_id: 1,
        id: 5,
        incidents: [
          {
            id: 2,
            title: "Recent Downtime",
            description:
              "We've noticed an issue with authentications and we're looking into it now.",
            service: 5,
            created_at: "2021-08-18T19:04:41.744965085Z",
            updated_at: "2021-08-18T19:04:41.744965085Z",
            updates: [
              {
                id: 4,
                message:
                  "Github is acting odd, probably getting DDOS-ed by China.",
                type: "investigating",
                created_at: "2021-08-18T17:04:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.845730518Z",
              },
              {
                id: 5,
                message: "Still seems to be an issue",
                type: "update",
                created_at: "2021-08-18T18:04:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.8477924Z",
              },
              {
                id: 6,
                message: "Github is now back online and everything is working.",
                type: "resolved",
                created_at: "2021-08-18T18:59:41.747364842Z",
                updated_at: "2021-08-18T19:04:41.850492954Z",
              },
            ],
          },
        ],
        last_error: "0001-01-01T00:00:00Z",
        last_success: "2021-08-25T07:38:24.846489526Z",
        latency: 2950,
        messages: [],
        name: "Google DNS",
        online: true,
        online_24_hours: 100,
        online_7_days: 100,
        order_id: 5,
        permalink: "",
        ping_time: 3,
        public: true,
        stats: {
          failures: 0,
          hits: 36823,
          first_hit: "2021-08-15T19:04:33.853774746Z",
        },
        status_code: 0,
        updated_at: "2021-08-18T19:03:51.146205849Z",
      },
      {
        avg_response: 0,
        check_interval: 30,
        created_at: "2021-05-20T19:03:50.95234435Z",
        failures_24_hours: 0,
        group_id: 0,
        id: 7,
        incidents: [],
        last_error: "0001-01-01T00:00:00Z",
        last_success: "0001-01-01T00:00:00Z",
        latency: 0,
        messages: [],
        name: "Static Service",
        online: false,
        online_24_hours: 100,
        online_7_days: 100,
        order_id: 7,
        permalink: "",
        ping_time: 0,
        public: true,
        stats: { failures: 0, hits: 0, first_hit: "0001-01-01T00:00:00Z" },
        status_code: 0,
        updated_at: "2021-08-18T19:03:51.153980156Z",
      },
    ];
    return services;
  }

  async service(id) {
    return axios.get("api/services/" + id).then((response) => response.data);
  }

  async service_create(data) {
    return axios.post("api/services", data).then((response) => response.data);
  }

  async service_update(data) {
    return axios
      .post("api/services/" + data.id, data)
      .then((response) => response.data);
  }

  async service_hits(id, start, end, group, fill = true) {
    return hits_data;
    // return axios
    //   .get(
    //     "api/services/" +
    //       id +
    //       "/hits_data?start=" +
    //       start +
    //       "&end=" +
    //       end +
    //       "&group=" +
    //       group +
    //       "&fill=" +
    //       fill
    //   )
    //   .then((response) => response.data);
  }

  async service_ping(id, start, end, group, fill = true) {
    return ping_data;
    // return axios
    //   .get(
    //     "api/services/" +
    //       id +
    //       "/ping_data?start=" +
    //       start +
    //       "&end=" +
    //       end +
    //       "&group=" +
    //       group +
    //       "&fill=" +
    //       fill
    //   )
    //   .then((response) => response.data);
  }

  async service_failures_data(url, start, end, group, fill = true) {
    return axios
      .get(`${url}?start=${start}&end=${end}&group=${group}&fill=${fill}`)
      .then((response) => response.data);
  }

  async service_uptime(id, start, end) {
    return axios
      .get("api/services/" + id + "/uptime_data?start=" + start + "&end=" + end)
      .then((response) => response.data);
  }

  async service_heatmap(id, start, end, group) {
    return axios
      .get("api/services/" + id + "/heatmap")
      .then((response) => response.data);
  }

  async service_failures(id, start, end, limit = 999, offset = 0) {
    return axios
      .get(
        "api/services/" +
          id +
          "/failures?start=" +
          start +
          "&end=" +
          end +
          "&limit=" +
          limit +
          "&offset=" +
          offset
      )
      .then((response) => response.data);
  }

  async service_failures_delete(service) {
    return axios
      .delete("api/services/" + service.id + "/failures")
      .then((response) => response.data);
  }

  async service_delete(id) {
    return axios.delete("api/services/" + id).then((response) => response.data);
  }

  async services_reorder(data) {
    return axios
      .post("api/reorder/services", data)
      .then((response) => response.data);
  }

  async checkins() {
    return axios.get("api/checkins").then((response) => response.data);
  }

  async groups() {
    return axios.get("api/groups").then((response) => response.data);
  }

  async groups_reorder(data) {
    return axios
      .post("api/reorder/groups", data)
      .then((response) => response.data);
  }

  async group_delete(id) {
    return axios.delete("api/groups/" + id).then((response) => response.data);
  }

  async group_create(data) {
    return axios.post("api/groups", data).then((response) => response.data);
  }

  async group_update(data) {
    return axios
      .post("api/groups/" + data.id, data)
      .then((response) => response.data);
  }

  async users() {
    return axios.get("api/users").then((response) => response.data);
  }

  async user_create(data) {
    return axios.post("api/users", data).then((response) => response.data);
  }

  async user_update(data) {
    return axios
      .post("api/users/" + data.id, data)
      .then((response) => response.data);
  }

  async user_delete(id) {
    return axios.delete("api/users/" + id).then((response) => response.data);
  }

  async incident_updates(incident) {
    return axios
      .get("api/incidents/" + incident.id + "/updates")
      .then((response) => response.data);
  }

  async incident_update_create(update) {
    return axios
      .post("api/incidents/" + update.incident + "/updates", update)
      .then((response) => response.data);
  }

  async incident_update_delete(update) {
    return axios
      .delete("api/incidents/" + update.incident + "/updates/" + update.id)
      .then((response) => response.data);
  }

  async incidents_service(id) {
    return incidents[id];
    // return axios
    //   .get("api/services/" + id + "/incidents")
    //   .then((response) => response.data);
  }

  async incident_create(service_id, data) {
    return axios
      .post("api/services/" + service_id + "/incidents", data)
      .then((response) => response.data);
  }

  async incident_delete(incident) {
    return axios
      .delete("api/incidents/" + incident.id)
      .then((response) => response.data);
  }

  async checkin(api) {
    return axios.get("api/checkins/" + api).then((response) => response.data);
  }

  async checkin_create(data) {
    return axios.post("api/checkins", data).then((response) => response.data);
  }

  async checkin_delete(checkin) {
    return axios
      .delete("api/checkins/" + checkin.api_key)
      .then((response) => response.data);
  }

  async messages() {
    return axios.get("api/messages").then((response) => response.data);
  }

  async message_create(data) {
    return axios.post("api/messages", data).then((response) => response.data);
  }

  async message_update(data) {
    return axios
      .post("api/messages/" + data.id, data)
      .then((response) => response.data);
  }

  async message_delete(id) {
    return axios.delete("api/messages/" + id).then((response) => response.data);
  }

  async group(id) {
    return axios.get("api/groups/" + id).then((response) => response.data);
  }

  async notifiers() {
    return axios.get("api/notifiers").then((response) => response.data);
  }

  async notifier_save(data) {
    return axios
      .post("api/notifier/" + data.method, data)
      .then((response) => response.data);
  }

  async notifier_test(data, notifier) {
    return axios
      .post("api/notifier/" + notifier + "/test", data)
      .then((response) => response.data);
  }

  async renewApiKeys() {
    return axios.get("api/renew").then((response) => response.data);
  }

  async logs() {
    return axios.get("api/logs").then((response) => response.data) || [];
  }

  async logs_last() {
    return axios.get("api/logs/last").then((response) => response.data);
  }

  async theme() {
    return axios.get("api/theme").then((response) => response.data);
  }

  async theme_generate(create = true) {
    if (create) {
      return axios.get("api/theme/create").then((response) => response.data);
    } else {
      return axios.delete("api/theme").then((response) => response.data);
    }
  }

  async theme_save(data) {
    return axios.post("api/theme", data).then((response) => response.data);
  }

  async import(data) {
    return axios
      .post("api/settings/import", data)
      .then((response) => response.data);
  }

  async check_token(token) {
    const f = { token: token };
    return axios
      .post("api/users/token", qs.stringify(f))
      .then((response) => response.data);
  }

  async login(username, password) {
    const f = { username: username, password: password };
    return axios
      .post("api/login", qs.stringify(f))
      .then((response) => response.data);
  }

  async logout() {
    return axios.get("api/logout").then((response) => response.data);
  }

  async scss_base() {
    return await axios({
      url: "/scss/base.scss",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const reader = new window.FileReader();
      return reader.readAsText(response.data);
    });
  }

  async configs() {
    return (
      axios.get("api/settings/configs").then((response) => response.data) || []
    );
  }

  async configs_save(data) {
    return (
      axios
        .post("api/settings/configs", data)
        .then((response) => response.data) || []
    );
  }

  token() {
    return localStorage.get(tokenKey);
  }

  authToken() {
    const tk = localStorage.get(tokenKey);
    if (tk) {
      return { Authorization: "Bearer " + tk };
    } else {
      return {};
    }
  }

  async github_release() {
    return fetch(
      "https://api.github.com/repos/statping/statping/releases/latest"
    ).then((response) => response.json());
  }

  async allActions(...all) {
    await axios.all([all]);
  }

  async fetchServices() {
    return axios.get("/services").then((response) => response.data);
  }

  async fetchSubServices(service_id) {
    return await axios
      .get(`/services/${service_id}/sub_services`)
      .then((response) => response.data);
  }
}

const API = new Api();
export default API;
