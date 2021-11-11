const path = require("path"),
  { promisify } = require("util"),
  glob = promisify(require("glob")),
  Event = require("./Event.js");
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

module.exports = class {
  constructor(a) {
    this.client = a;
  }

  shorten(a, b = 2e3) {
    return a.length > b ? `${a.substr(0, b - 3)}...` : a;
  }

  list(a, b = "and") {
    const c = a.length;
    return 0 === c ? "" : 1 === c ? a[0] : `${a.slice(0, -1).join(", ")}${1 < c ? `${2 < c ? "," : ""} ${b} ` : ""}${a.slice(-1)}`;
  }
  formatNumberK(a) {
    return 999 < a ? `${(a / 1e3).toLocaleString(void 0, { maximumFractionDigits: 1 })}K` : a;
  }
  stripInvites(a, { guild: b = !0, bot: c = !0, text: d = "[redacted invite]" } = {}) {
    return b && (a = a.replace(inviteRegex, d)), c && (a = a.replace(botInvRegex, d)), a;
  }
  delay(a) {
    return new Promise((b) => setTimeout(b, a));
  }
  isClass(a) {
    return "function" == typeof a && "object" == typeof a.prototype && "class" === a.toString().substring(0, 5);
  }
  get directory() {
    return `${path.dirname(require.main.filename)}${path.sep}`;
  }

  trimArray(a, b = 10) {
    if (a.length > b) {
      const c = a.length - b;
      (a = a.slice(0, b)), a.push(`${c} more...`);
    }
    return a;
  }
  formatBytes(a) {
    if (0 === a) return "0 Bytes";
    const b = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, b)).toFixed(2))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b]}`;
  }
  removeDuplicates(a) {
    return [...new Set(a)];
  }
  capitalize(a) {
    return a
      .split(" ")
      .map((a) => a.slice(0, 1).toUpperCase() + a.slice(1))
      .join(" ");
  }

  comparePerms(a, b) {
    return a.roles.highest.position < b.roles.highest.position;
  }

  formatArray(a, b = "conjunction") {
    return new Intl.ListFormat("en-GB", { style: "short", type: b }).format(a);
  }
  async loadCommands() {
    return glob(`${this.directory}commands/**/*.js`).then((commands) => {
      for (const commandFile of commands) {
        const command = require(commandFile);
        //console.log(commandFile)
        this.client.commands.set(command.data.name, command);
      }
    });
  }
  async loadEvents() {
    return glob(`${this.directory}events/**/*.js`).then((events) => {
      for (const eventFile of events) {
        delete require.cache[eventFile];
        const { name } = path.parse(eventFile);
        const File = require(eventFile);
        if (!this.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
        const event = new File(this.client, name);
        if (!(event instanceof Event)) throw new TypeError(`Event ${name} doesn't belong in Events`);
        this.client.events.set(event.name, event);
        event.emitter[event.type](name, (...args) => event.run(...args));
      }
    });
  }
};
