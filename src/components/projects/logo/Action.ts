export default class Action {
	action: any;
	params: any[];
	n_args: number;

	constructor(params: any[], action: any) {
		this.action = action;

		this.params = params;
		this.n_args = params.length;
	}

	toString(args: any[]) {
		if (this.n_args != args.length) return null;

		var result = this.action;
		for (var i = 0; i < this.n_args; i++) {
			var regex = new RegExp(this.params[i], 'g');
			result = result.replace(regex, args[i]);
		}

		return result;
	}

	use(args: any[]) {
		var name = this.action.split(' ')[0];
		// basicDict[name](args);
	}
}
