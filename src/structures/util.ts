import { readdirSync } from 'fs';
import type { SlashCommand, event } from './types/index.js';
import type lillyclient from './lillyClient.js';
import fs from 'fs';
const inviteRegex =
	/(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(\.gg|(app)?\.com\/invite|\.me)\/([^ ]+)\/?/gi;
const botInvRegex =
	/(https?:\/\/)?(www\.|canary\.|ptb\.)?discord(app)?\.com\/(api\/)?oauth2\/authorize\?([^ ]+)\/?/gi;

export default class Utils {
	client: lillyclient;
	constructor(a: lillyclient) {
		this.client = a;
	}
	shorten({ a, b = 1024 }: { a: string; b?: number }): string {
		function shorten(): string {
			return a.length > b ? `${a.substring(0, b - 3)}...` : a; 
		}
		return shorten();
	}

	list(a: unknown[], b = 'and') {
		return list();
		function list() {
			const c = a.length;
			return c === 0
				? ''
				: c === 1
				? a[0]
				: `${a.slice(0, -1).join(', ')}${c > 1 ? `${c > 2 ? ',' : ''} ${b} ` : ''}${a.slice(-1)}`;
		}
	}
	formatNumberK(a: number) {
		return formatNumber();
		function formatNumber() {
			return a > 999 ? `${(a / 1e3).toLocaleString(void 0, { maximumFractionDigits: 1 })}K` : a;
		}
	}
	stripInvites(a: string, { guild: b = true, bot: c = true, text: d = '[redacted invite]' } = {}) {
		return stripInvites();
		function stripInvites() {
			return b && (a = a.replace(inviteRegex, d)), c && (a = a.replace(botInvRegex, d)), a;
		}
	}
	delay(a: number) {
		return delay();
		function delay() {
			return new Promise((b) => setTimeout(b, a));
		}
	}
	isClass(a: { prototype: unknown; toString: () => string }) {
		return isClass();
		function isClass() {
			return (
				typeof a == 'function' &&
				typeof a.prototype == 'object' &&
				a.toString().substring(0, 5) === 'class'
			);
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
		if (a === 0) return '0 Bytes';
		const b = Math.floor(Math.log(a) / Math.log(1024));
		return `${parseFloat((a / Math.pow(1024, b)).toFixed(2))} ${
			['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][b]
		}`;
	}
	removeDuplicates(a: Iterable<unknown>) {
		return [...new Set(a)];
	}
	capitalize(a: string) {
		return capitalize();
		function capitalize() {
			return a
				.split(' ')
				.map((a: string) => a.slice(0, 1).toUpperCase() + a.slice(1))
				.join(' ');
		}
	}
	toTitleCase(str: string) {
		return toTitleCase();
		function toTitleCase() {
			return str.replace(/\w\S*/g, function (txt: string) {
				return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
			});
		}
	}

	comparePerms(
		a: { roles: { highest: { position: number } } },
		b: { roles: { highest: { position: number } } },
	) {
		return comparePerms();
		function comparePerms() {
			return a.roles.highest.position < b.roles.highest.position;
		}
	}

	formatArray(a: string, b = 'conjunction') {
		return formatArray();
		function formatArray() {
			return new Intl.ListFormat('en-GB', {
				style: 'short',
				type: b as Intl.ListFormatType,
			}).format(a);
		}
	}

	async loadCommands() {
		const modules = ['administrator', 'fun', 'information', 'utilities'];
		for (const folder of modules) {
			const commandFiles = fs
				.readdirSync(`./dist/src/commands/${folder}/`)
				.filter((file: string) => file.endsWith('.js'));
			for (const commandFile of commandFiles) {
				const slashy: SlashCommand = await import(`../commands/${folder}/${commandFile}`);
				this.client.commands.set(slashy.slashy.name, slashy);
			}
		}
	}
	async loadEvents() {
		const eventFiles = readdirSync(`./dist/src/events`).filter((file) =>
			file.toString().endsWith('.js'),
		);

		for (const eventFile of eventFiles) {
			const event: event = await import(`../events/${eventFile}`);
			if (event.once) {
				this.client.on(event.name, (...args) => event.run(...args));
			} else {
				this.client.on(event.name, (...args) => event.run(...args));
			}
		}
	}
}
