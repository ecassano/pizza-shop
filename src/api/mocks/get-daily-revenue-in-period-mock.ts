import { http, HttpResponse } from "msw";
import { GetDailyRevenueInPeriodResponse } from "../get-daily-revenue-in-period";

export const getDailyRevenueInPeriodMock = http.get<
  never,
  never,
  GetDailyRevenueInPeriodResponse
>("/metrics/daily-receipt-in-period", () => {
  return HttpResponse.json([
    { date: "26/11/2024", receipt: 959 },
    { date: "25/11/2024", receipt: 234 },
    { date: "24/11/2024", receipt: 843 },
    { date: "23/11/2024", receipt: 432 },
    { date: "22/11/2024", receipt: 567 },
    { date: "21/11/2024", receipt: 943 },
    { date: "20/11/2024", receipt: 439 },
  ]);
});
