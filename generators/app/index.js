'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const prompts = require('./prompts');
const writeFiles = require('./writing');

module.exports = class extends Generator {
	initializing() {
		this.log(yosay("Hey dude, it's a  " + chalk.red('generator-babypack')));
	}
	prompting() {
		return this.prompt(prompts).then(props => {
			// To access props later use this.props.someAnswer;
			this.props = props;
		});
	}

	writing() {
	  writeFiles.call(this);
	  this._writeModuleFiles();
	  this._templating();
	  this._writeDotFiles();
	}

	install() {
		this.installDependencies({bower: false});
	}

	end() {
    this.log('Thanks for using this generator!');
  }
};
