export const core = {
  allow_reports: true,
  commit: "2352cae85cb388437ae848c6acd0a658a4cd2d84",
  created_at: "2021-08-18T19:03:50.948350158Z",
  name: "Razorpay Status Page",
  description:
    "This pages show historical information about the state of our platform incidents, RCA (Root Cause Analisys), scheduled maintenance, conectivity problems with our third party and all related data about the perfomance of our services.",
  domain: "http://localhost:3000",
  footer: "",
  language: "en",
  migration_id: 1629313430,
  setup: true,
  started_on: "2021-08-18T19:04:44.943630138Z",
  updated_at: "2021-08-18T19:04:42.046324648Z",
  using_cdn: false,
  version: "0.90.74",
};

export const services = [
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
            message: "Problem is continuing and we are looking at the issue.",
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
            message: "Github is acting odd, probably getting DDOS-ed by China.",
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

export const messages = [
  {
    created_at: "2021-08-18T19:03:51.24638352Z",
    description: "This is an example a upcoming message for a service!",
    end_on: "2021-08-18T21:03:51.246083592Z",
    id: 1,
    service: 1,
    start_on: "2021-08-18T19:18:51.246083269Z",
    title: "Routine Downtime",
    updated_at: "2021-08-18T19:03:51.24638352Z",
  },
  {
    created_at: "2021-08-18T19:03:51.25014047Z",
    description: "This is another example a upcoming message for a service!",
    end_on: "2021-08-18T21:03:51.249974753Z",
    id: 2,
    service: 3,
    start_on: "2021-08-18T19:18:51.249974522Z",
    title: "Server Reboot",
    updated_at: "2021-08-18T19:03:51.25014047Z",
  },
];

export const groups = [
  {
    created_at: "2021-08-18T19:03:54.54638466Z",
    id: 2,
    name: "Linked Services",
    order_id: 1,
    public: true,
    updated_at: "2021-08-18T19:03:54.54638466Z",
  },
  {
    created_at: "2021-08-18T19:03:54.451754749Z",
    id: 1,
    name: "Main Services",
    order_id: 2,
    public: true,
    updated_at: "2021-08-18T19:03:54.451754749Z",
  },
];

export const incidents = {
  1: [],
  2: [],
  3: [],
  4: [
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
          message: "Problem is continuing and we are looking at the issue.",
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
  5: [
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
          message: "Github is acting odd, probably getting DDOS-ed by China.",
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
};

export const failure_data = [
  { timeframe: "2021-05-26T00:00:00Z", amount: 0 },
  { timeframe: "2021-05-27T00:00:00Z", amount: 0 },
  { timeframe: "2021-05-28T00:00:00Z", amount: 0 },
  { timeframe: "2021-05-29T00:00:00Z", amount: 0 },
  { timeframe: "2021-05-30T00:00:00Z", amount: 0 },
  { timeframe: "2021-05-31T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-01T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-02T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-03T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-04T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-05T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-06T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-07T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-08T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-09T00:00:00Z", amount: 12 },
  { timeframe: "2021-06-10T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-11T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-12T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-13T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-14T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-15T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-16T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-17T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-18T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-19T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-20T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-21T00:00:00Z", amount: 0 },
  { timeframe: "2021-06-22T00:00:00Z", amount: 0 },
  { timeframe: "2021-08-27T00:00:00Z", amount: 0 },
];

export const hits_data = [
  { timeframe: "2021-08-22T11:00:00Z", amount: 647654 },
  { timeframe: "2021-08-22T12:00:00Z", amount: 656332 },
  { timeframe: "2021-08-22T13:00:00Z", amount: 751719 },
  { timeframe: "2021-08-22T14:00:00Z", amount: 738763 },
  { timeframe: "2021-08-22T15:00:00Z", amount: 693920 },
  { timeframe: "2021-08-22T16:00:00Z", amount: 727511 },
  { timeframe: "2021-08-22T17:00:00Z", amount: 703925 },
  { timeframe: "2021-08-22T18:00:00Z", amount: 705146 },
  { timeframe: "2021-08-22T19:00:00Z", amount: 715577 },
  { timeframe: "2021-08-22T20:00:00Z", amount: 738837 },
  { timeframe: "2021-08-22T21:00:00Z", amount: 728384 },
  { timeframe: "2021-08-22T22:00:00Z", amount: 735150 },
  { timeframe: "2021-08-22T23:00:00Z", amount: 678874 },
  { timeframe: "2021-08-23T00:00:00Z", amount: 687061 },
  { timeframe: "2021-08-23T01:00:00Z", amount: 669326 },
  { timeframe: "2021-08-23T02:00:00Z", amount: 704123 },
  { timeframe: "2021-08-23T03:00:00Z", amount: 648010 },
  { timeframe: "2021-08-23T04:00:00Z", amount: 683058 },
  { timeframe: "2021-08-23T05:00:00Z", amount: 711877 },
  { timeframe: "2021-08-23T06:00:00Z", amount: 645160 },
  { timeframe: "2021-08-23T07:00:00Z", amount: 729792 },
  { timeframe: "2021-08-23T08:00:00Z", amount: 703515 },
  { timeframe: "2021-08-23T09:00:00Z", amount: 680103 },
  { timeframe: "2021-08-23T10:00:00Z", amount: 709328 },
  { timeframe: "2021-08-23T11:00:00Z", amount: 683681 },
  { timeframe: "2021-08-23T12:00:00Z", amount: 697499 },
  { timeframe: "2021-08-23T13:00:00Z", amount: 750097 },
  { timeframe: "2021-08-23T14:00:00Z", amount: 731247 },
  { timeframe: "2021-08-23T15:00:00Z", amount: 679658 },
  { timeframe: "2021-08-23T16:00:00Z", amount: 729794 },
  { timeframe: "2021-08-23T17:00:00Z", amount: 782589 },
  { timeframe: "2021-08-23T18:00:00Z", amount: 763615 },
  { timeframe: "2021-08-23T19:00:00Z", amount: 700180 },
  { timeframe: "2021-08-23T20:00:00Z", amount: 774694 },
  { timeframe: "2021-08-23T21:00:00Z", amount: 867817 },
  { timeframe: "2021-08-23T22:00:00Z", amount: 808875 },
  { timeframe: "2021-08-23T23:00:00Z", amount: 752279 },
  { timeframe: "2021-08-24T00:00:00Z", amount: 645355 },
  { timeframe: "2021-08-24T01:00:00Z", amount: 778559 },
  { timeframe: "2021-08-24T02:00:00Z", amount: 612089 },
  { timeframe: "2021-08-24T03:00:00Z", amount: 609166 },
  { timeframe: "2021-08-24T04:00:00Z", amount: 673195 },
  { timeframe: "2021-08-24T05:00:00Z", amount: 625364 },
  { timeframe: "2021-08-24T06:00:00Z", amount: 667084 },
  { timeframe: "2021-08-24T07:00:00Z", amount: 626749 },
  { timeframe: "2021-08-24T08:00:00Z", amount: 664166 },
  { timeframe: "2021-08-24T09:00:00Z", amount: 702914 },
  { timeframe: "2021-08-24T10:00:00Z", amount: 672972 },
  { timeframe: "2021-08-24T11:00:00Z", amount: 692392 },
  { timeframe: "2021-08-24T12:00:00Z", amount: 724685 },
  { timeframe: "2021-08-24T13:00:00Z", amount: 736549 },
  { timeframe: "2021-08-24T14:00:00Z", amount: 717902 },
  { timeframe: "2021-08-24T15:00:00Z", amount: 712815 },
  { timeframe: "2021-08-24T16:00:00Z", amount: 661334 },
  { timeframe: "2021-08-24T17:00:00Z", amount: 816904 },
  { timeframe: "2021-08-24T18:00:00Z", amount: 875117 },
  { timeframe: "2021-08-24T19:00:00Z", amount: 868902 },
  { timeframe: "2021-08-24T20:00:00Z", amount: 815272 },
  { timeframe: "2021-08-24T21:00:00Z", amount: 806737 },
  { timeframe: "2021-08-24T22:00:00Z", amount: 780887 },
  { timeframe: "2021-08-24T23:00:00Z", amount: 792650 },
  { timeframe: "2021-08-25T00:00:00Z", amount: 706111 },
  { timeframe: "2021-08-25T01:00:00Z", amount: 649018 },
  { timeframe: "2021-08-25T02:00:00Z", amount: 692276 },
  { timeframe: "2021-08-25T03:00:00Z", amount: 657713 },
  { timeframe: "2021-08-25T04:00:00Z", amount: 728056 },
  { timeframe: "2021-08-25T05:00:00Z", amount: 635420 },
  { timeframe: "2021-08-25T06:00:00Z", amount: 685465 },
  { timeframe: "2021-08-25T07:00:00Z", amount: 661456 },
  { timeframe: "2021-08-25T08:00:00Z", amount: 752446 },
  { timeframe: "2021-08-25T09:00:00Z", amount: 697030 },
  { timeframe: "2021-08-25T10:00:00Z", amount: 696567 },
  { timeframe: "2021-08-25T11:00:00Z", amount: 713480 },
  { timeframe: "2021-08-25T12:00:00Z", amount: 667647 },
];

export const ping_data = [
  { timeframe: "2021-08-22T11:00:00Z", amount: 34015 },
  { timeframe: "2021-08-22T12:00:00Z", amount: 40067 },
  { timeframe: "2021-08-22T13:00:00Z", amount: 66616 },
  { timeframe: "2021-08-22T14:00:00Z", amount: 50084 },
  { timeframe: "2021-08-22T15:00:00Z", amount: 45222 },
  { timeframe: "2021-08-22T16:00:00Z", amount: 57103 },
  { timeframe: "2021-08-22T17:00:00Z", amount: 49297 },
  { timeframe: "2021-08-22T18:00:00Z", amount: 29157 },
  { timeframe: "2021-08-22T19:00:00Z", amount: 54595 },
  { timeframe: "2021-08-22T20:00:00Z", amount: 51697 },
  { timeframe: "2021-08-22T21:00:00Z", amount: 53938 },
  { timeframe: "2021-08-22T22:00:00Z", amount: 47555 },
  { timeframe: "2021-08-22T23:00:00Z", amount: 40813 },
  { timeframe: "2021-08-23T00:00:00Z", amount: 38551 },
  { timeframe: "2021-08-23T01:00:00Z", amount: 37462 },
  { timeframe: "2021-08-23T02:00:00Z", amount: 42176 },
  { timeframe: "2021-08-23T03:00:00Z", amount: 25326 },
  { timeframe: "2021-08-23T04:00:00Z", amount: 32498 },
  { timeframe: "2021-08-23T05:00:00Z", amount: 37353 },
  { timeframe: "2021-08-23T06:00:00Z", amount: 38680 },
  { timeframe: "2021-08-23T07:00:00Z", amount: 43802 },
  { timeframe: "2021-08-23T08:00:00Z", amount: 44112 },
  { timeframe: "2021-08-23T09:00:00Z", amount: 40673 },
  { timeframe: "2021-08-23T10:00:00Z", amount: 49159 },
  { timeframe: "2021-08-23T11:00:00Z", amount: 42515 },
  { timeframe: "2021-08-23T12:00:00Z", amount: 51909 },
  { timeframe: "2021-08-23T13:00:00Z", amount: 61772 },
  { timeframe: "2021-08-23T14:00:00Z", amount: 48372 },
  { timeframe: "2021-08-23T15:00:00Z", amount: 39205 },
  { timeframe: "2021-08-23T16:00:00Z", amount: 42560 },
  { timeframe: "2021-08-23T17:00:00Z", amount: 49520 },
  { timeframe: "2021-08-23T18:00:00Z", amount: 61147 },
  { timeframe: "2021-08-23T19:00:00Z", amount: 50213 },
  { timeframe: "2021-08-23T20:00:00Z", amount: 60018 },
  { timeframe: "2021-08-23T21:00:00Z", amount: 45597 },
  { timeframe: "2021-08-23T22:00:00Z", amount: 47077 },
  { timeframe: "2021-08-23T23:00:00Z", amount: 52576 },
  { timeframe: "2021-08-24T00:00:00Z", amount: 39295 },
  { timeframe: "2021-08-24T01:00:00Z", amount: 32184 },
  { timeframe: "2021-08-24T02:00:00Z", amount: 33765 },
  { timeframe: "2021-08-24T03:00:00Z", amount: 37371 },
  { timeframe: "2021-08-24T04:00:00Z", amount: 49415 },
  { timeframe: "2021-08-24T05:00:00Z", amount: 48147 },
  { timeframe: "2021-08-24T06:00:00Z", amount: 55326 },
  { timeframe: "2021-08-24T07:00:00Z", amount: 36387 },
  { timeframe: "2021-08-24T08:00:00Z", amount: 60686 },
  { timeframe: "2021-08-24T09:00:00Z", amount: 53409 },
  { timeframe: "2021-08-24T10:00:00Z", amount: 66688 },
  { timeframe: "2021-08-24T11:00:00Z", amount: 60574 },
  { timeframe: "2021-08-24T12:00:00Z", amount: 76672 },
  { timeframe: "2021-08-24T13:00:00Z", amount: 93804 },
  { timeframe: "2021-08-24T14:00:00Z", amount: 72244 },
  { timeframe: "2021-08-24T15:00:00Z", amount: 55091 },
  { timeframe: "2021-08-24T16:00:00Z", amount: 51842 },
  { timeframe: "2021-08-24T17:00:00Z", amount: 55012 },
  { timeframe: "2021-08-24T18:00:00Z", amount: 72071 },
  { timeframe: "2021-08-24T19:00:00Z", amount: 73848 },
  { timeframe: "2021-08-24T20:00:00Z", amount: 50473 },
  { timeframe: "2021-08-24T21:00:00Z", amount: 67047 },
  { timeframe: "2021-08-24T22:00:00Z", amount: 60755 },
  { timeframe: "2021-08-24T23:00:00Z", amount: 54479 },
  { timeframe: "2021-08-25T00:00:00Z", amount: 56297 },
  { timeframe: "2021-08-25T01:00:00Z", amount: 52994 },
  { timeframe: "2021-08-25T02:00:00Z", amount: 37713 },
  { timeframe: "2021-08-25T03:00:00Z", amount: 55697 },
  { timeframe: "2021-08-25T04:00:00Z", amount: 52448 },
  { timeframe: "2021-08-25T05:00:00Z", amount: 55987 },
  { timeframe: "2021-08-25T06:00:00Z", amount: 67025 },
  { timeframe: "2021-08-25T07:00:00Z", amount: 54088 },
  { timeframe: "2021-08-25T08:00:00Z", amount: 111568 },
  { timeframe: "2021-08-25T09:00:00Z", amount: 61577 },
  { timeframe: "2021-08-25T10:00:00Z", amount: 58888 },
  { timeframe: "2021-08-25T11:00:00Z", amount: 74515 },
  { timeframe: "2021-08-25T12:00:00Z", amount: 70467 },
];

export const up_time_data = {
  start: "2021-08-22T23:27:58.180713+05:30",
  end: "2021-08-26T18:27:58.180713+05:30",
  uptime: 200,
  downtime: 40,
  series: [
    {
      start: "2021-08-22T23:27:58.180713+05:30",
      end: "2021-08-22T23:27:58.300118+05:30",
      duration: 15,
      online: false,
    },
    {
      start: "2021-08-22T23:27:58.300118+05:30",
      end: "2021-08-23T00:02:58.180713+05:30",
      duration: 30,
      online: true,
    },
    {
      start: "2021-08-23T00:02:58.180713+05:30",
      end: "2021-08-23T00:02:58.300118+05:30",
      duration: 5,
      online: false,
    },
    {
      start: "2021-08-23T00:02:58.300118+05:30",
      end: "2021-08-23T00:37:58.180713+05:30",
      duration: 70,
      online: true,
    },
    {
      start: "2021-08-22T23:27:58.180713+05:30",
      end: "2021-08-22T23:27:58.300118+05:30",
      duration: 15,
      online: false,
    },
    {
      start: "2021-08-22T23:27:58.300118+05:30",
      end: "2021-08-23T00:02:58.180713+05:30",
      duration: 30,
      online: true,
    },
    {
      start: "2021-08-23T00:02:58.180713+05:30",
      end: "2021-08-23T00:02:58.300118+05:30",
      duration: 5,
      online: false,
    },
    {
      start: "2021-08-23T00:02:58.300118+05:30",
      end: "2021-08-23T00:37:58.180713+05:30",
      duration: 70,
      online: true,
    },
  ],
};
