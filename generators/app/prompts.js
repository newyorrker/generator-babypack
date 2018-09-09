const _ = require('lodash');
const path = require('path');
const user = require('yeoman-generator/lib/actions/user');

function appName() {
	name = _.kebabCase(path.basename(process.cwd()));
	return name;
}
function gitUser() {
	gitUser = _.kebabCase(user.git.name());
	return gitUser;
}

module.exports = [
	{
		name: 'name',
		message: 'Your project name',
		default: appName
	},
	{
		name: 'gitUser',
		message: 'Your GitHub username',
		default: gitUser
	}
];