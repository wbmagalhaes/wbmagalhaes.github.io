import Command from './Command';
import Action, { type ActionsDictProp } from './Action';

export default class LogoParser {
	private index: number = 0;
	private commands: Command[] = [];

	constructor(codeString: string, actions: ActionsDictProp) {
		this.parseCode(codeString, actions);
	}

	private static sliceInput(input: string): string[] {
		return input
			.split(/(\[\s*\d+\s+\d+\s+\d+\s*\])|\n|(\[)|(\])|(\s+)/)
			.filter((x) => x !== undefined && x != '' && x != ' ');
	}

	private parseCode(codeString: string, actions: ActionsDictProp) {
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

						subCode = '[' + tokens.slice(start + 1, i).join(' ') + ']';
				}

				if (depth == 0) {
					splittedTokens.push(subCode);
				}
			}

			this.parseTokens(splittedTokens, actions);
		} catch (e) {
			console.log(e);
		}
	}

	private parseTokens(tokens: string[], actions: ActionsDictProp) {
		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			const action = actions[token];

			if (action) {
				const args = tokens.slice(i + 1, i + 1 + action.n_args);

				let newCommands: Command[] = [];
				if (action.function_body) {
					let subCode = action.parseBody(args);
					let subParser = new LogoParser(subCode, actions);
					newCommands = subParser.commands;
				} else {
					newCommands = [new Command(token, args)];
				}

				newCommands.forEach((c) => {
					this.commands.push(c);
				});

				i += action.n_args;

				continue;
			}

			switch (token) {
				case 'repeat':
					i = this.repeatCommand(i, tokens, actions);
					break;
				case 'to':
					i = this.defCommand(i, tokens, actions);
					break;
			}
		}
	}

	private repeatCommand(i: number, tokens: string[], actions: ActionsDictProp): number {
		let n = Action.evalValue(tokens[i + 1], 1);
		let subCode = tokens[i + 2];
		subCode = subCode.slice(1, subCode.length - 1);

		let subParser = new LogoParser(subCode, actions);
		for (let _ = 0; _ < n; _++) {
			this.commands = [...this.commands, ...subParser.commands];
		}

		return i + 2;
	}

	private defCommand(i: number, tokens: string[], actions: ActionsDictProp): number {
		let end = tokens.indexOf('end', i);
		let subCode = tokens.slice(i + 1, end);
		let name = subCode[0];

		let start = 1;
		let params = [];

		for (start = 1; start < subCode.length; start++) {
			const token = subCode[start];

			if (token.charAt(0) === ':') {
				params.push(token);
			} else {
				break;
			}
		}

		let body = subCode.slice(start).join(' ');
		actions[name] = new Action(name, params, null, body);

		return end;
	}

	getNext(): Command | null {
		if (this.index < this.commands.length) {
			return this.commands[this.index++];
		}

		return null;
	}

	isFinished() {
		return this.index >= this.commands.length;
	}
}
