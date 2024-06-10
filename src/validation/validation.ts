import isValidUTF8 from "utf-8-validate";
import { isLoggerIdRegex } from "./regex";
import { assert } from "../util/assert";

//validate the utf-8 encoding of the buffer
export const validateSynLoggerMsg = (
  buf: Buffer,
  customErrorMsg?: string
): string => {
  assert(isValidUTF8(buf), customErrorMsg ?? "Expected a valid UTF-8 encoding");

  return buf.toString("utf8");
};

//validate the logger id
export const validateSynLoggerId = (
  loggerId: string,
  customErrorMsg?: string
): string => {
  assert(
    isLoggerIdRegex.test(loggerId),
    `${customErrorMsg ?? "Invalid logger ID"}: ${loggerId}`
  );

  return loggerId;
};

//validate that a given string can be parsed into a float
export const validateNumeric = (
  value: string,
  returnNumber?: boolean,
  customErrorMsg?: string
): string | number => {
  assert(
    !isNaN(parseFloat(value)) && isFinite(Number(value)),
    customErrorMsg ??
      `${customErrorMsg ?? "Expected a numeric value"}: ${value}`
  );

  return returnNumber ? parseFloat(value) : value;
};

//validate that a given timestamp is a unix timestamp
export const validateTimestamp = (
  timestamp: number | string,
  customErrorMsg?: string
) => {
  let numericTimestamp;

  if (typeof timestamp === "string") {
    numericTimestamp = validateNumeric(
      timestamp,
      true,
      customErrorMsg
    ) as number;
  } else {
    assert(
      typeof timestamp === "number" && !isNaN(timestamp) && isFinite(timestamp),
      `${customErrorMsg ?? "Expected a numeric value"}: ${timestamp}`
    );
    numericTimestamp = timestamp as number;
  }

  const date = new Date(numericTimestamp);

  assert(
    date && date.getTime() > 0,
    `${
      customErrorMsg ??
      `The given timestamp is not a valid Unix timestamp: ${timestamp}`
    }: ${numericTimestamp}`
  );

  return numericTimestamp;
};
