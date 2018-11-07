import * as types from './../constants/ActionType';
import database from './../firebase';
import * as auths from './../auth';
import firebase from './../firebase';
import randomstring from 'randomstring';

const storage = firebase.storage();

export const getListMessageRequest = () =>{
	return (dispatch) => {
				var messages = {};
				database.database().ref('messages').on('value',(snapshot) => {
					snapshot.forEach( (data) =>{
						let message = data.val();
						messages = {
							...messages,
							[message.id] : message
						}
					});
				dispatch(getListMessage(messages));
				})
	}
}

export const getListMessage = (messages) => {
	return {
		type:types.GET_LIST_MESSAGES,
		messages: messages
	}
}

export const inputMessageRequest = (message) => {
	return (dispatch) => {
		database.database().ref('messages').push(message).then(
			() => {
				dispatch(inputMessage(message))
			}
		);

	}
}

export const inputMessage = (message) => {
	return {
		type: types.INPUT_MESSAGES,
		message: message
	}
}

export const signUpRequest = (email,password,name) =>{
	return (dispatch) => {
		auths.doCreateUserWithEmailAndPassword(email,password).then( 
				(resp) => {
					var user = firebase.auth().currentUser;
					console.log('user',)
					if(user){
							user.updateProfile({
								displayName: name,
								photoURL: '../img/1.png'
							}).then( (res) => {
								dispatch(createUserSuccess(resp))
							}
							);
					}
			})
			.catch( 
				err => {
					dispatch(createUserFalse(err))	
			}
			);
	}
}

export const createUserSuccess = (user) => {
	return {
		type: types.SIGN_UP,
		user: user
	}
}

export const createUserFalse = (error) => {
	return {
		type: types.CREATE_USER_FAIL,
		error: error
	}
}

export const signInRequest = (email,password) => { 
	return (dispatch) => {
		auths.doSignInWithEmailAndPassword(email,password).then((res) => {
			dispatch(signInSuccess(res))
		}).catch((err) => {
			dispatch(signInFalse(err));
		})
	}
}

export const signInSuccess = (user) => {
	return {
		type:types.SIGN_IN_SUCCESS,
		user:user
	}
}

export const signInFalse = (err) => {
	return {
		type: types.SIGN_IN_FALSE,
		err: err
	}
}

export const uploadImageRequest = (image) => {
	return (dispatch) => {
		database.database().ref('images').push(image).then(
			() => {
				dispatch(uploadImage(image))
		})
	}
}

export const uploadImage = (image) => {
	return {
		type: types.UPLOAD_IMAGE_DB,
		image:image
	}
}

export const getListImageRequest = () => {
	return (dispatch) => {
		var images = {};
		database.database().ref('images').on('value', (snapshot) => {
			snapshot.forEach( (data) => {
				let image = data.val();
				images = {
					...images,
					[image.id] : image
				}
			});
		dispatch(getListImage(images))
		})
	}
}

export const getListImage = (images) => {
	return {
		type: types.GET_LIST_IMAGE,
		images:images
	}
}
 
export const getUserProfileRequest = () => {
	return (dispatch) => {
		firebase.auth().onAuthStateChanged( (user) => {
		  if (user) {
		    dispatch(getUserProfile(user));
		  }
		});
		
	}
}

export const getUserProfile = (user) => {
	return {
		type: types.GET_USER_PROFILE,
		user: user
	}
}

//-----UPLOAD IMAGE-----
export const updateUserImageRequest = (image) => {
	return (dispatch) => {
		var randString = randomstring.generate(7);
		var imgName = `${image.name}-${randString}`;
		const upload = firebase.storage().ref(`avatars/${imgName}`).put(image);
		upload.on('state_changed',
				(snapshot) => {
				
				},
				(error) => {
					console.log(error)
				},
				() => {
					storage.ref('avatars').child(image.name).getDownloadURL().then((url) => {
						var user = firebase.auth().currentUser;
						if(user){
							user.updateProfile({
								photoURL: url
							}).then(
							() => {
								dispatch(updateUserImage(user))
							}
							);
						}
				});
			}
		);
}
}


export const updateUserImage = (user) => {
	return{
		type: types.UPDATE_USER_IMAGE,
		user:user
	}
}

//-----UPLOAD IMAGE-----

//-----SIGN OUT-----
export const signOutRequest = () => {
	return (dispatch) => {
		firebase.auth().signOut().then(() => {
			localStorage.removeItem('user');
	 		localStorage.removeItem('name');
	 		dispatch(signOut());
		});
	}
}

export const signOut = () => {
	return {
		type: types.SIGN_OUT
	}
}

//-----SIGN OUT-----

//-----BLOG ACTION-----
export const postArticleRequest = (blog) => {
	return (dispatch) => {
		

		//--UPLOAD IMAGE--
		if(blog.img){
		var randString = randomstring.generate(7);
		var imgName = `${blog.img.name}-${randString}`;
		const upload = firebase.storage().ref(`blogs/${imgName}`).put(blog.img);
		upload.on('state_changed',
				(snapshot) => {
				
				},
				(error) => {
					console.log(error)
				},
				() => {
					storage.ref('blogs').child(imgName).getDownloadURL().then((url) => {
						blog.img = url;
						database.database().ref('articles').push(blog).then(
							() => {
								dispatch(postArticle());
							}
						)
					}
				);
			}
		);
		}
		else{
				database.database().ref('articles').push(blog).then(
							() => {
								dispatch(postArticle());
							}
				)
		}
	}
}

export const postArticle = () => {
	return {
		type: types.POST_ARTICLE
	}
}

export const getListArticleRequest = () => {
	return (dispatch) => {
		var articles = {}
		database.database().ref('articles').on('value', (snap) => {
			snap.forEach((data) => {
				var article = data.val();
				articles = {
					...articles,
					[article.id]: article
				}
			});
			dispatch(getListArticle(articles));
		});
	}
}

export const getListArticle = (articles) => {
	return {
		type: types.GET_LIST_ARTICLE,
		articles : articles
	}
}