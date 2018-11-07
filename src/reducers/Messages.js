import * as types from './../constants/ActionType';
var initialState = {};

const Messages = (state = initialState, action) => {
	switch(action.type){
		
		case types.GET_LIST_MESSAGES:
			state = action.messages;
			return action.messages;

		case types.INPUT_MESSAGES:
			return state;

		default: 
			return state;
	}
}

export default Messages;