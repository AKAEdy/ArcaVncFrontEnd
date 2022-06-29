// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
 
    BASE_URL: 'http://localhost:9898/api/',
    AUTH_URL: 'http://localhost:9898/api/auth/',
    TOKEN_NAME :'AUTH_ARCA',
    production: false,
    firebase:{
      apiKey: "AIzaSyBOnERGSsRCkljHl17LZhGwNFu2JgAb9JQ",
      authDomain: "arca-b4126.firebaseapp.com",
      projectId: "arca-b4126",
      storageBucket: "arca-b4126.appspot.com",
      messagingSenderId: "1051218881257",
      appId: "1:1051218881257:web:48c80279680bf3a81ede78"
    }    

  
  // BASE_URL: 'https://vinculation.herokuapp.com/api/',
  // AUTH_URL: 'https://vinculation.herokuapp.com/api/auth/',
  // TOKEN_NAME :'AUTH_ARCA',
  // production: false
};
