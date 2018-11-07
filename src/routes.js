import React from 'react';
import BlogPage from './pages/BlogPage/BlogPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import Upload from './pages/Upload/Upload';
const routes = [
	{
		path: '/chat-room',
		exact: true,
		main : () => <BlogPage />
	}
	,
	{
		path: '/galery',
		exact: true,
		main : ({history}) => <Upload history={history} />
	},
	{
		path: '/profile/:id',
		exact: true,
		main : ({match}) => <ProfilePage match={match} />
	}
];

export default routes;