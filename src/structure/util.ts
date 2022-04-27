import type Lillyclient from './Lillyclient';


const { inviteRegex, botInvRegex } = InviteRegexes();

export default class utils{
  client: Lillyclient;
  constructor(a:Lillyclient) {
    this.client = a;
  }

  shorten({ a, b = 2000 }: { a: string; b?: number; }): string {
      return shorten() ; 


    function shorten(): string {
      return a.length > b ? `${a.substring(0, b - 3)}...` : a;
    }
  }

  list(a: any[], b = "and") {
    return list();

    function list() {
      const c = a.length;
      return 0 === c
        ? ""
        : 1 === c
          ? a[0]
          : `${a.slice(0, -1).join(", ")}${1 < c ? `${2 < c ? "," : ""} ${b} ` : ""}${a.slice(-1)}`;
    }
  }
  formatNumberK(a: number) {
    return formatNumber();

    function formatNumber() {
      return 999 < a
        ? `${(a / 1e3).toLocaleString(void 0, { maximumFractionDigits: 1 })}K`
        : a;
    }
  }
  stripInvites(
    a: string,
    { guild: b = true, bot: c = true, text: d = "[redacted invite]" } = {}
  ) {
    return stripInvites();

    function stripInvites() {
      return b && (a = a.replace(inviteRegex, d)),
        c && (a = a.replace(botInvRegex, d)),
        a;
    }
  }
  delay(a: number) {
    return delay();

    function delay() {
      return new Promise((b) => setTimeout(b, a));
    }
  }
  isClass(a: { prototype: any; toString: () => string; }) {
    return isClass();

    function isClass() {
      return "function" == typeof a &&
        "object" == typeof a.prototype &&
        "class" === a.toString().substring(0, 5);
    }
  }

  trimArray(a: string[], b = 10) {
    return trimArray();

    function trimArray() {
      if (a.length > b) {
        const c = a.length - b;
        (a = a.slice(0, b)), a.push(`${c} more...`);
      }
    }
  }
  formatBytes(a: number) {
    if (0 === a) return "0 Bytes";
    const b = Math.floor(Math.log(a) / Math.log(1024));
    return `${parseFloat((a / Math.pow(1024, b)).toFixed(2))} ${["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"][b]
      }`;
  }
  removeDuplicates(a: Iterable<unknown>) {
    return [...new Set(a)];
  }
  capitalize(a: string) {
    return capitalize();

    function capitalize() {
      return a
        .split(" ")
        .map((a: string) => a.slice(0, 1).toUpperCase() + a.slice(1))
        .join(" ");
    }
  }
  toTitleCase(str: string) {
    return toTitleCase();

    function toTitleCase() {
      return str.replace(
        /\w\S*/g,
        function (txt: string) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    }
  }

  comparePerms(a: { roles: { highest: { position: number; }; }; }, b: { roles: { highest: { position: number; }; }; }) {
    return comparePerms();

    function comparePerms() {
      return a.roles.highest.position < b.roles.highest.position;
    }
  }

  formatArray(a: any, b = "conjunction") {
    return formatArray();

    function formatArray() {
      return new Intl.ListFormat("en-GB", {
        style: "short",
        type: b as Intl.ListFormatType,
      }).format(a);
    }
  }
};

function InviteRegexes() {
  const inviteRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
  const botInvRegex = /(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;
  return { inviteRegex, botInvRegex };
}
