import { bind, compose, tap } from "ramda";
import { parseString } from "./ext-ramda.js";

const boundLog = bind(console.log, console);

const log = compose(tap(boundLog), parseString);

export { log };