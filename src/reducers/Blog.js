import * as types from './../constants/ActionType'; 
const initialState = {};

const Blog = (state = initialState, action) => {
	switch(action.type){
		case types.POST_ARTICLE:
			return {...state};
		case types.GET_LIST_ARTICLE:
			state = action.articles;
			return {...state};
		default:
			return {...state};
	}
}

export default Blog
