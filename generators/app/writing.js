const _ = require('lodash');
const path = require('path');
const mkdirp = require('mkdirp');

module.exports = function() {
	var props = this.props;

	props._ = {
		kebabCase: _.kebabCase
	};

	// Write a .gitignore
	this._writeDotFiles = () => {
		this.fs.copy(this.templatePath('.gitignore'), this.destinationPath('.gitignore'));
		this.fs.copy(this.templatePath('.eslintrc'), this.destinationPath('.eslintrc'));
		this.fs.copy(this.templatePath('.babelrc'), this.destinationPath('.babelrc'));
	};

	this._writeModuleFiles = () => {
		this.fs.copyTpl(
			this.templatePath('README.md'),
			this.destinationPath('README.md'),
			props
		);
		this.fs.copyTpl(
			this.templatePath('package.json'),
			this.destinationPath('package.json'),
			props
		);
		this.fs.copy(
			this.templatePath('webpack.config.js'),
			this.destinationPath('webpack.config.js')
		);
	};
	// Copy and templating
	this._templating = () => {
		this.fs.copyTpl(this.templatePath('src'), this.destinationPath('src'), props);
		this.fs.copyTpl(this.templatePath('dist'), this.destinationPath('dist'), props);
	};
};
