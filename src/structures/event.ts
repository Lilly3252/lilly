/* eslint-disable @typescript-eslint/no-unused-vars */
import type { event } from "./index.js"

export default class Event {
    name!: event["name"];
    client!: event["client"];
    once!: event["once"];
    emitter!: event["emitter"]
    run(..._args: unknown[]): Promise<void> {
        throw new Error(`The run method has not been implemented in ${this.name}`);
    }
}
