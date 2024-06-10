import {
  validateNumeric,
  validateSynLoggerId,
  validateTimestamp,
} from "../validation/validation";
import {
  SYN_LOGGER_MSG_REL_FILE_PATH,
  SynLoggerMsgFileFormat,
} from "./constants";
import * as fs from "fs";
import * as path from "path";

export const synLoggerMsgHandler = (msg: string) => {
  const [unValidatedLoggerId, ...data] = msg.split("\n");

  const validatedLoggerId = validateSynLoggerId(unValidatedLoggerId);

  for (let i = 0; i < data.length; i += 1) {
    if (data[i]) {
      const [timestamp, ...values] = data[i].split(",");

      const validatedTimestamp = validateTimestamp(timestamp);
      const validatedValues = values.map(
        (value) => validateNumeric(value, true) as number
      );
      const fileName = `${validatedLoggerId}-${validatedTimestamp}.${SynLoggerMsgFileFormat.JSON}`;
      const filePath = path.join(SYN_LOGGER_MSG_REL_FILE_PATH, fileName);
      writeSynLoggerMsgToFile(filePath, validatedValues);
    }
  }
};

const writeSynLoggerMsgToFile = (
  filePath: string,
  values: (string | number)[]
) => {
  fs.writeFile(filePath, JSON.stringify(values), (err) => {
    if (err) throw err;
    console.log(`Saved ${filePath}`);
  });
};
