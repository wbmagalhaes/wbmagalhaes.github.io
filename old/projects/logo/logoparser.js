class LogoParser {
	constructor(tokens) {
		this.idx = 0;
		this.tokens = tokens;

		this.commands = [];
	}

	nextToken(token) {
		var result = [];

		if (token == 'repeat') {
			var n = eval(this.getArgs(1)[0]);
			var subCode = this.tokens.slice(this.idx + 1);

			var subParser = new LogoParser(subCode);
			var cmds = subParser.parse(true);

			for (var i = 0; i < n; i++)
				cmds.forEach((cmd) => {
					result.push(cmd);
				});

			this.idx += subParser.idx + 1;
		} else if (token == 'to') {
			var n = this.tokens.indexOf('end', this.idx);
			var subCode = this.tokens.slice(this.idx + 1, n);

			var name = subCode[0];

			var params = [];

			var i = 1;
			for (i = 1; i < subCode.length; i++) {
				if (subCode[i].charAt(0) == ':') params.push(subCode[i]);
				else break;
			}

			var actions = subCode.slice(i).join(' ');

			console.log('name: ', name);
			console.log('params: ', params);
			console.log('actions: ', actions);

			createAction(name, params, name + ' ' + actions, false);
			this.idx = n;
		} else if (!actionDict[token]) {
			return null;
		} else {
			var action = actionDict[token];
			var args = this.getArgs(action.n_args);

			var code = action.toString(args);

			if (action.basic) {
				result.push(new Command(action, args));
			} else {
				var subTokens = sliceInput(code).slice(1);
				var subParser = new LogoParser(subTokens);

				var cmds = subParser.parse(false);
				cmds.forEach((cmd) => {
					result.push(cmd);
				});
			}
		}

		return result;
	}

	parse(isTokenList) {
		this.commands = [];

		var depth = 0;
		try {
			for (this.idx = 0; this.idx < this.tokens.length; this.idx++) {
				var token = this.tokens[this.idx];

				if (isTokenList) {
					if (token == '[') {
						depth++;
						continue;
					} else if (token == ']') {
						depth--;

						if (depth == 0) {
							return this.commands;
						} else {
							continue;
						}
					}
				}

				var cmds = this.nextToken(token);
				cmds.forEach((cmd) => {
					this.commands.push(cmd);
				});
			}

			if (depth != 0) return null;

			this.idx = 0;
			return this.commands;
		} catch {
			return null;
		}
	}

	getNext() {
		if (this.idx < this.commands.length) return this.commands[this.idx++];
		return null;
	}

	getArgs(n) {
		this.idx++;
		var args = this.tokens.slice(this.idx, this.idx + n);
		this.idx += n - 1;

		return args;
	}
}

class Command {
	constructor(action, args) {
		this.action = action;
		this.args = args;
	}

	obey() {
		this.action.use(this.args);
	}
}

class Action {
	constructor(params, action, basic) {
		this.action = action;

		this.params = params;
		this.n_args = params.length;

		this.basic = basic;
	}

	toString(args) {
		if (this.n_args != args.length) return null;

		var result = this.action;
		for (var i = 0; i < this.n_args; i++) {
			var regex = new RegExp(this.params[i], 'g');
			result = result.replace(regex, args[i]);
		}

		return result;
	}

	use(args) {
		if (!this.basic) return;

		var name = this.action.split(' ')[0];
		basicDict[name](args);
	}
}
