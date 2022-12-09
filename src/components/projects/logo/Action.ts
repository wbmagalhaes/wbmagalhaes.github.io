type BaseActionsDictProp = {
	fd: Action;
	bk: Action;
	rt: Action;
	lt: Action;
	pu: Action;
	pd: Action;
	thickness: Action;
	rgb: Action;
	randomColor: Action;
};

export type ActionsDictProp = BaseActionsDictProp & { [key: string]: Action };
export type ActionFunction = (arg: string[]) => void;

export default class Action {
	name: string;
	args: string[];
	n_args: number;
	function_exec: ActionFunction | null;
	function_body: string | null;

	constructor(
		name: string,
		args: string[],
		function_exec: ActionFunction | null = null,
		function_body: string | null = null
	) {
		this.name = name;
		this.args = args;
		this.n_args = args.length;
		this.function_exec = function_exec;
		this.function_body = function_body;
	}

	parseBody(args: string[]): string {
		if (this.n_args != args.length) {
			return 'error';
		}

		if (this.function_body) {
			let result = this.function_body;
			for (let i = 0; i < this.n_args; i++) {
				let regex = new RegExp(this.args[i], 'g');
				result = result.replace(regex, args[i]);
			}
			return result;
		}

		return `${this.name} ${args.join(' ')}`;
	}

	static evalValue(value: string, defaultValue: number = 0) {
		let amount = defaultValue;
		try {
			amount = eval(value);
		} catch {}

		return amount;
	}
}
