import assert from "assert";
import { isValidUTF8 } from "../types/utf-8-validate";
import { isLoggerIdRegex } from "./regex";

export const validateSynLoggerMsg = (buf: Buffer): string => {
  assert(isValidUTF8(buf), "Expected a valid UTF-8 encoding");

  return buf.toString("utf8");
};

export const validateSynLoggerId = (loggerId: string): string => {
  assert(isLoggerIdRegex.test(loggerId), "Expected a valid SynLogger ID");
  
  return loggerId;
};

export const validateNumeric = (value: string): string => {
  assert(
    isNaN(parseFloat(value)) && isFinite(Number(value)),
    "Expected a numeric string"
  );

  return value;
};
