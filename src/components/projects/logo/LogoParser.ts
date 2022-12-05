import Command from './Command';

export class LogoParser {
	index: number = 0;
	commands: Command[] = [];

	parseCode(codeString: string) {
		console.log(codeString);

		this.commands = [];

		try {
			let tokens = LogoParser.sliceInput(codeString);
			LogoParser.parseTokens(tokens);
		} catch (e) {
			console.log(e);
		}
	}

	private static parseTokens(tokens: string[]) {
		let start = 0;
		let depth = 0;

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];
			let subCode = [token];

			switch (token) {
				case '[':
					if (depth == 0) {
						start = i;
					}

					depth++;
					continue;

				case ']':
					depth--;

					if (depth == 0) {
						subCode = tokens.slice(start, i);
					}
					continue;
			}

			console.log(subCode);

			// const commands = LogoParser.parseToken(token);
			// commands?.forEach((c) => {
			// 	this.commands.push(c);
			// });
		}
	}

	private static sliceInput(input: string): string[] {
		return input
			.split(/(\[\s*\d+\s+\d+\s+\d+\s*\])|\n|(\[)|(\])|(\s+)/)
			.filter((x) => x !== undefined && x != '' && x != ' ');
	}

	// private static parseToken(token: string) {
	// 	var result = [];

	// 	if (token == 'repeat') {
	// 		var n = eval(this.getArgs(1)[0]);
	// 		var subCode = this.tokens.slice(this.index + 1);

	// 		var subParser = new LogoParser(subCode);
	// 		var cmds = subParser.parse(true);

	// 		for (var i = 0; i < n; i++)
	// 			cmds.forEach((cmd) => {
	// 				result.push(cmd);
	// 			});

	// 		this.index += subParser.index + 1;
	// 	} else if (token == 'to') {
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
	// 	} else if (!actionDict[token]) {
	// 		return null;
	// 	} else {
	// 		var action = actionDict[token];
	// 		var args = this.getArgs(action.n_args);

	// 		var code = action.toString(args);

	// 		if (action.basic) {
	// 			result.push(new Command(action, args));
	// 		} else {
	// 			var subTokens = LogoParser.sliceInput(code).slice(1);
	// 			var subParser = new LogoParser(subTokens);

	// 			var cmds = subParser.parse(false);
	// 			cmds.forEach((cmd) => {
	// 				result.push(cmd);
	// 			});
	// 		}
	// 	}

	// 	return result;
	// }

	// getArgs(n) {
	// 	this.index++;
	// 	var args = this.tokens.slice(this.index, this.index + n);
	// 	this.index += n - 1;

	// 	return args;
	// }

	getNext(): Command | null {
		if (this.index < this.commands.length) return this.commands[this.index++];
		return null;
	}

	isFinished() {
		return true;
	}
}
