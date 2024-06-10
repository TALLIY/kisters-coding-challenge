import nodeAssert from "assert";

export const assert = (value: boolean, message?: string | Error) => {
  if (process.env.PROD && process.env.PROD !== "1") {
    //throw error in development and test environments
    nodeAssert(value, message);
  } else {
    //in a production environment errors should be logged somewhere without throwing an error
    if (!value) console.log(`AssertionError [ERR_ASSERTION]: ${message}`);
  }
};
