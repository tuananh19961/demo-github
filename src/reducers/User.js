import * as types from './../constants/ActionType'; 
var initialState = {};

const User = (state = initialState, action) => {
	switch(action.type){
		  case types.SIGN_UP:
			     localStorage.setItem('user',action.user.user.uid);
           localStorage.setItem('name',action.user.user.displayName);
			     var userId = localStorage.getItem('user');
           return { ...state,loggedIn: true, userId}

      case types.CREATE_USER_FAIL:
        	  const { error } = action;
            return {...state, loggedIn: false, error }

   		case types.SIGN_IN_SUCCESS:
     			localStorage.setItem('user',action.user.user.uid);
          localStorage.setItem('name',action.user.user.displayName);
     			return { ...state,loggedIn: true, userId}

      case types.SIGN_IN_FALSE:
        	const { err } = action;
          return { ...state, loggedIn: false, err }

      case types.GET_USER_PROFILE:
            state = action.user;
            return {...state,loggedIn:true};

      case types.UPDATE_USER_IMAGE:
            return {...state,...action.user,process:true,};

      case types.SIGN_OUT:
            return {}
            
		  default: 
			      return state;
	}
}

export default User;