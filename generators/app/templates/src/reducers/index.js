import { combineReducers } from 'redux';

import playlists from './playlists';

export default combineReducers({
	tracks,
	playlists,
	filterTracks
})