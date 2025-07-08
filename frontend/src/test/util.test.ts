import { describe, expect, test } from "vitest";
import { dateIsInThePast, dateIsToday } from "../util/util.ts";
import dayjs from "dayjs";

describe("Util functions", () => {
  test("check is the date is same day as today", () => {
    const isToday = dateIsToday(dayjs().utc());

    expect(isToday).toBe(true);
  });

  test("check is the date is in the past", () => {
    const isInThePast = dateIsInThePast(dayjs("2011-01-01").utc());

    expect(isInThePast).toBe(true);
  });
});
