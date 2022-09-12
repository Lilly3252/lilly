import { readdirSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
export default class Utils {
    client;
    constructor(a) {
        this.client = a;
    }
    shorten({ a, b = 2000 }) {
        return shorten();
        function shorten() {
            return a.length > b ? `${a.substring(0, b - 3)}...` : a;
        }
    }
    list(a, b = "and") {
        return list();
        function list() {
            const c = a.length;
            return c === 0
                ? ""
                : c === 1
                    ? a[0]
                    : `${a.slice(0, -1).join(", ")}${c > 1 ? `${c > 2 ? "," : ""} ${b} ` : ""}${a.slice(-1)}`;
        }
    }
    formatNumberK(a) {
        return formatNumber();
        function formatNumber() {
            return a > 999
                ? `${(a / 1e3).toLocaleString(void 0, { maximumFractionDigits: 1 })}K`
                : a;
        }
    }
    stripInvites(a, { guild: b = true, bot: c = true, text: d = "[redacted invite]" } = {}) {
        return stripInvites();
        function stripInvites() {
            return b && (a = a.replace(inviteRegex, d)),
                c && (a = a.replace(botInvRegex, d)),
                a;
        }
    }
    delay(a) {
        return delay();
        function delay() {
            return new Promise((b) => setTimeout(b, a));
        }
    }
    isClass(a) {
        return isClass();
        function isClass() {
            return typeof a == "function" &&
                typeof a.prototype == "object" &&
                a.toString().substring(0, 5) === "class";
        }
    }
    trimArray(a, b = 10) {
        return trimArray();
        function trimArray() {
            if (a.length > b) {
                const c = a.length - b;
                (a = a.slice(0, b)), a.push(`${c} more...`);
            }
        }
    }
    formatBytes(a) {
        if (a === 0)
            return "0 Bytes";
        const b = Math.floor(Math.log(a) / Math.log(1024));
        return `${parseFloat((a / Math.pow(1024, b)).toFixed(2))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b]}`;
    }
    removeDuplicates(a) {
        return [...new Set(a)];
    }
    capitalize(a) {
        return capitalize();
        function capitalize() {
            return a
                .split(" ")
                .map((a) => a.slice(0, 1).toUpperCase() + a.slice(1))
                .join(" ");
        }
    }
    toTitleCase(str) {
        return toTitleCase();
        function toTitleCase() {
            return str.replace(/\w\S*/g, function (txt) {
                return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
            });
        }
    }
    comparePerms(a, b) {
        return comparePerms();
        function comparePerms() {
            return a.roles.highest.position < b.roles.highest.position;
        }
    }
    formatArray(a, b = "conjunction") {
        return formatArray();
        function formatArray() {
            return new Intl.ListFormat("en-GB", {
                style: "short",
                type: b,
            }).format(a);
        }
    }
    async loadCommands() {
        const slashyFiles = readdirSync(path.resolve(__dirname, 'commands')).filter(file => file.toString().endsWith('.js'));
        (async () => {
            for (const commandFile of slashyFiles) {
                const slashy = await import(path.resolve(__dirname, 'commands', commandFile));
                this.client.commands.set(slashy.slashy.name, slashy);
            }
        });
    }
    async loadEvents() {
        const eventFiles = readdirSync(path.resolve(__dirname, 'events')).filter(file => file.toString().endsWith('.js'));
        for (const eventFile of eventFiles) {
            const event = await import(path.resolve(__dirname, 'events', eventFile));
            if (event.once) {
                this.client.on(event.name, (...args) => event.run(...args));
            }
            else {
                this.client.on(event.name, (...args) => event.run(...args));
            }
        }
    }
}
//# sourceMappingURL=util.js.map