import Command from './Command';
import Action from './Action';
import type { ActionsDictProp } from './Action';

export default class LogoParser {
	index: number = 0;
	commands: Command[];

	constructor(actions: ActionsDictProp, codeString: string) {
		this.index = 0;
		this.commands = LogoParser.parseCode(actions, codeString);
	}

	private static sliceInput(input: string): string[] {
		return input
			.split(/(\[\s*\d+\s+\d+\s+\d+\s*\])|\n|(\[)|(\])|(\s+)/)
			.filter((x) => x !== undefined && x != '' && x != ' ');
	}

	private static parseCode(actions: ActionsDictProp, codeString: string) {
		try {
			let tokens = LogoParser.sliceInput(codeString);
			let splittedTokens: string[] = [];

			let start = 0;
			let depth = 0;

			for (let i = 0; i < tokens.length; i++) {
				const token = tokens[i];
				let subCode = token;

				switch (token) {
					case '[':
						if (depth == 0) {
							start = i;
						}

						depth++;
						continue;

					case ']':
						depth--;

						if (depth > 0) {
							continue;
						}

						subCode = tokens.slice(start + 1, i).join(' ');
				}

				if (depth == 0) {
					splittedTokens.push(subCode);
				}
			}

			return LogoParser.parseTokens(actions, splittedTokens);
		} catch (e) {
			console.log(e);
		}

		return [];
	}

	private static parseTokens(actions: ActionsDictProp, tokens: string[]): Command[] {
		let result: Command[] = [];

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (actions[token]) {
				const action = actions[token];
				const args = tokens.slice(i + 1, i + 1 + action.n_args);
				result.push(new Command(token, args));

				i += action.n_args;

				// if not basic action
				// var subTokens = LogoParser.sliceInput(code).slice(1);
				// var subParser = new LogoParser(subTokens);
				// var cmds = subParser.parse(false);
				// cmds.forEach((cmd) => {
				// 	result.push(cmd);
				// });

				continue;
			}

			switch (token) {
				case 'repeat':
					let n = Action.evalValue(tokens[i + 1], 1);
					let subCode = tokens[i + 2];
					let subParser = new LogoParser(actions, subCode);

					for (let _ = 0; _ < n; _++) {
						result = [...result, ...subParser.commands];
					}

					i += 2;

				// case 'to':
			}
		}

		// 		var n = this.tokens.indexOf('end', this.index);
		// 		var subCode = this.tokens.slice(this.index + 1, n);

		// 		var name = subCode[0];

		// 		var params = [];

		// 		var i = 1;
		// 		for (i = 1; i < subCode.length; i++) {
		// 			if (subCode[i].charAt(0) == ':') params.push(subCode[i]);
		// 			else break;
		// 		}

		// 		var actions = subCode.slice(i).join(' ');

		// 		console.log('name: ', name);
		// 		console.log('params: ', params);
		// 		console.log('actions: ', actions);

		// 		createAction(name, params, name + ' ' + actions, false);
		// 		this.index = n;
		// }

		return result;
	}

	getNext(): Command | null {
		if (this.index < this.commands.length) {
			return this.commands[this.index++];
		}

		return null;
	}
}
