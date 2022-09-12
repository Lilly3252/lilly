export default class Event {
    name;
    client;
    once;
    emitter;
    run(..._args) {
        throw new Error(`The run method has not been implemented in ${this.name}`);
    }
}
//# sourceMappingURL=event.js.map