# Description

This is a custom implementation of German board game "[Mensch ärgere Dich nicht](https://en.wikipedia.org/wiki/Mensch_%C3%A4rgere_Dich_nicht)". When it will be done, users can play together (up to 4 players) and/or play with a bots.

  

# Goal

The main goal of this project is to create Smart TV multiplayer game, that's why there is as much as possible logic placed in the backend side (e.g. user don't throw the dice as navigation is not comfortable on TVs), but server does automatically.

  

# Screenshots

![enter image description here](https://github.com/DmytroCh/game-front-end/blob/master/screenshot_board.png)

  

# How to run?

## npm version

To run UI you should:

- have installed node

- run [back-end](https://github.com/DmytroCh/game-back-end)

- install required modules: `npm install`

- execute one of commands in the terminal: 
	- `npm run dev` - to use default api url from .env file
	- `API_URL=[your api url] npm run dev` - with custom ws api url
  
 ## Docker version
To run UI as container you should:
- have installed docker
- run [back-end](https://github.com/DmytroCh/game-back-end)
- build docker image of the service. Been in project's folder execute: `docker build . -t ui`
- execute one of commands in the terminal: 
	- `docker run -p 3000:3000 -d ui` - to use default api url from .env file. Container will be runbased on `ui` image in detached mode.
	- `docker run -p 3000:3000 -d -e API_URL=[api url] ui` - Same as above, but with custom ws api url.

## Docker-compose version
This option build both services, so you don't need to download and run back-end before. Api url is defined in `docker-compose.yaml` file if you want use custom url - do changes there before run.
- have installed docker
- have installed docker-compose
- run `docker-compose up` - it will download, build and run both services from git repos.

# Usefull links
dockerization tutorial: https://www.freecodecamp.org/news/how-to-implement-runtime-environment-variables-with-create-react-app-docker-and-nginx-7f9d42a91d70/
