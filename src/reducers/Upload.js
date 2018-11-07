import * as types from './../constants/ActionType';
var initialState = {};

const Upload = (state = initialState, action) => {
	switch(action.type){
		case types.UPLOAD_IMAGE_DB:
			return state;

		case types.GET_LIST_IMAGE:
			state = action.images;
			return {...state};

		default:
			return state;
	}
}

export default Upload