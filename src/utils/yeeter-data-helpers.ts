// import { formatValueTo, fromWei } from "@daohaus/utils";
import { RecordItem, YeeterItem, YeeterMetadata } from "./types";
// import { formatValueTo } from "./units";

export const calcProgressPerc = (a: string, b: string) => {
  let div = Number(a) / Number(b);

  if (div > 0 && div < 0.04) div = 0.04;
  return Number(div) * 100;
};

export const calcDurationPerc = (start: string, end: string) => {
  const now = new Date().getTime() / 1000;
  const yeetDuration = Number(end) - Number(start);
  const currentDuration = Number(end) - Number(now);
  const durationUsed = yeetDuration - currentDuration;

  return (durationUsed / yeetDuration) * 100;
};

export const calcYeetIsActive = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.startTime) < now && Number(yeeter.endTime) > now;
};

export const calcYeetIsEnded = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.endTime) < now;
};

export const calcYeetIsComingSoon = (yeeter: YeeterItem) => {
  const now = new Date().getTime() / 1000;

  return Number(yeeter.startTime) > now;
};

export const calcYeetIsFull = (yeeter: YeeterItem) => {
  return Number(yeeter.balance) >= Number(yeeter.goal);
};

export const addParsedContent = (
  record?: RecordItem
): YeeterMetadata | undefined => {
  if (record?.contentType === "json") {
    try {
      const obj = JSON.parse(record.content);
      return obj;
    } catch (e) {
      console.log("err", e);
      return;
    }
  }
};
