import { formatDate } from './formatDate.js';

Date.prototype.addDays = function (days)
{
      const date = new Date(this.valueOf())
      date.setDate(date.getDate() + days)
      return date
}

var timeTableCollector = [
      {
            date: formatDate((new Date().addDays(1))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 1
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(2))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(3))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(4))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(5))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(6))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(7))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      }
];

var timeTableJanitor = [
      {
            date: formatDate((new Date().addDays(1))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(2))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(3))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(4))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(5))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(6))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      },
      {
            date: formatDate((new Date().addDays(7))).toLocaleString("en-US", { timeZone: "Asia/Ho_Chi_Minh" }),
            shifts: [
                  {
                        period: "7h00-12h00",
                        count: 0
                  },
                  {
                        period: "13h00-18h00",
                        count: 0
                  },
                  {
                        period: "19h00-0h00",
                        count: 0
                  }
            ]
      }
];

export { timeTableCollector };
export { timeTableJanitor };