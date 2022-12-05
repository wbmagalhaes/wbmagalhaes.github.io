import Action from './Action';

export default class Command {
	action: Action;
	args: any[];

	constructor(action: Action, args: any[]) {
		this.action = action;
		this.args = args;
	}

	execute() {
		this.action.use(this.args);
	}
}
