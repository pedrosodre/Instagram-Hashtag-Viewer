# Instagram Hashtag Viewer

This project consists in a simple backend built with *node.js* and *express* that retrieve Instagram photos based on a hashtag, using crawler concept. I've also included on this repository a simple frontend that I made for my graduation party,  built with *HTML*, *CSS* and *JavaScript*.

The entire backend responsible for get these photos is available at `app.js` file, built with node.js.

## Installation

### Backend

Use the package manager [npm](https://www.npmjs.com/) to install all dependencies.

```bash
npm install
```
### Frontend

Choose a web server of your choice and host frontend files there.

## Usage

### Backend

Step 1. Change the hashtag that you want to retrieve on `app.js` file, at line 8.
```javascript
const hashtag           = 'YourHashtag';
```

Step 2. Start the backend by running the command `npm start` (or `npm run production` to run it with pm2).

### Frontend

Step 1. Change the backend address on `index.html` file, at line 55.
```javascript
$.get('https://backend.domain/api', function (data) {
```

Step 2. Customize your frontend as you want.

Step 3. Host your frontend files.

## To do

- Arrange backend into cohesive and encapsulated modules
- Make a generic frontend with newer technologies (such as React or Vue.js) to make it easier to use

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](https://choosealicense.com/licenses/mit/)
