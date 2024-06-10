import nodeAssert from "assert";

export const assert = (
  value: boolean,
  message?: string | Error
): void => {
  if (process.env.PROD && process.env.PROD !== "1") {
    nodeAssert(value, message);
  } else {
    //in a production environment errors should be logged somewhere
    if (!value) {
      console.log(`AssertionError [ERR_ASSERTION]: ${message}`);
      nodeAssert(value);
    }
  }
};
