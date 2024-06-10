import assert from "assert";
import { isValidUTF8 } from "../types/utf-8-validate";
import { isLoggerIdRegex } from "./regex";

export const validateSynLoggerMsg = (
  buf: Buffer,
  customErrorMsg?: string
): string => {
  assert(isValidUTF8(buf), customErrorMsg ?? "Expected a valid UTF-8 encoding");

  return buf.toString("utf8");
};

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

export const validateNumeric = (
  value: string,
  returnNumber?: boolean,
  customErrorMsg?: string
): string | number => {
  assert(
    isNaN(parseFloat(value)) && isFinite(Number(value)),
    customErrorMsg ??
      `${customErrorMsg ?? "Expected a numeric value"}: ${value}`
  );

  return returnNumber ? parseFloat(value) : value;
};

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
      typeof timestamp === "number",
      `${customErrorMsg ?? "Expected a numeric value"}: ${timestamp}`
    );
    numericTimestamp = timestamp as number;
  }

  const date = new Date(numericTimestamp * 1000);

  assert(
    date.getTime() > 0,
    `${
      customErrorMsg ?? "Given timestamp cannot be a negative number"
    }: ${numericTimestamp}`
  );

  return numericTimestamp;
};
