import path from "path";

const SYN_LOGGER_MSG_REL_FILE_PATH = "../../data" 

export const SYN_LOGGER_MSG_FILE_PATH = path.join(__dirname, SYN_LOGGER_MSG_REL_FILE_PATH);

export enum SynLoggerMsgFileFormat {
    JSON="json"
}


