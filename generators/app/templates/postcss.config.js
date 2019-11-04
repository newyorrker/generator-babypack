function isMax(mq) {
		return /max-width/.test(mq);
}

function isMin(mq) {
		return /min-width/.test(mq);
}

function sortMediaQueries(a, b) {
		A = a.replace(/\D/g, '');
		B = b.replace(/\D/g, '');

		if (isMax(a) && isMax(b)) {
				return B - A;
		} else if (isMin(a) && isMin(b)) {
				return A - B;
		} else if (isMax(a) && isMin(b)) {
				return 1;
		} else if (isMin(a) && isMax(b)) {
				return -1;
		}

		return 1;
}

module.exports = ({env}) => {

	const devMode = process.env.NODE_ENV !== 'production';

  return {
  	plugins: {
  		'autoprefixer': {
  			'browsers': ['last 10 versions'],
				'grid': true
  		},
  		'css-mqpacker': {
  			sort: sortMediaQueries
  		},
  		'cssnano': devMode ? false : {preset: 'default'}
  	}
  }
}