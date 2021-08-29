# Chatime APIs
	  
Chatime is a realtime chat application. Inside this repository is a suite of APIs created for the project to run on any platform. This is Express-Based API for [Chatime Frontend](https://github.com/rpetzandrian/chatime-frontend).

## Getting Started

To get the Node server running locally:

* Clone this repo with `git clone https://github.com/rpetzandrian/chatime-server.git project-name`
* `cd project-name`
* `npm install` to install all required dependencies
* Create a `.env` file and reference the `.env.example` file
* `node server.js or npm start if nodemon installed in your computer` to start the local server

## Architechture

The architechture to created this project: 
1. Database PostgreSQL
2. Node JS
3. Express JS ( Framework )

## API Routes

 - **#User**
	 - **Get all users**
			  `GET` */api/v1/users*
	- **Get user by id**
			  `GET` */api/v1/users/:id*
	- **Search user by name**
			  `GET` */api/v1/users/search?name=*
	- **Add new user**
			  `POST` */api/v1/users/*
	- **Update user** *( Admin only )*
			  `PATCH`*/api/v1/users/:id*
	- **Update profile** 
			  `PATCH`*/api/v1/users/update/:id*
	- **Delete user**
			  `DELETE` */api/v1/users/:id*

 - **#Contact**
	 - **Get all contacts**
			  `GET` */api/v1/contacts/:id*
	- **Get contact by friend id**
			  `GET` */api/v1/contacts/:id/:friend_id*
	- **Search contact by name**
			  `GET` */api/v1/contacts/:id/search?name=*
	- **Add new user**
			  `POST` */api/v1/contacts/:id*
	- **Update contact**
			  `PATCH`*/api/v1/contacts/:id/:friend_id*
	- **Delete user**
			  `DELETE` */api/v1/contacts/:id/:friend_id*

 - **#Contact**
	 - **Get all chatrooms**
			  `GET` */api/v1/chats/chatrooms/:id*
	- **Add new chatroom**
			  `POST` */api/v1/chats/chatrooms/:id*
	- **Delete chatroom**
			  `DELETE` */api/v1/chats/chatrooms/:chatroom_id*
	- **Get all message by chatroom**
			  `GET` */api/v1/chats/messages/:chatroom_id*
	- **Add new message**
			  `POST`*/api/v1/chats/messages/:chatroom_id*
	- **Delete message**
			  `DELETE` */api/v1/chats/messages/:message_id*

 - **#Authentication**
	 - **Register**
			  `POST` */api/v1/auth/register*
	- **Login**
			  `POST` */api/v1/auth/login*
			  
 *[Documentation](https://documenter.getpostman.com/view/13687762/Tz5jczZP)
