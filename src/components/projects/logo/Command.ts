export default class Command {
	name: string;
	args: string[];

	constructor(name: string, args: string[]) {
		this.name = name;
		this.args = args;
	}
}
