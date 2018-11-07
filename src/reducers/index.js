import { combineReducers } from 'redux';
import Messages from './Messages';
import User from './User'
import Upload from './Upload'
import Blog from './Blog'
const appReducer = combineReducers(
		{
			Messages: Messages,
			User: User,
			Upload:Upload,
			Blog: Blog
		}
);

export default appReducer