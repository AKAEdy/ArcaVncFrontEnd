// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  BASE_URL: 'http://localhost:9898/api/',
  AUTH_URL: 'http://localhost:9898/api/auth/',
  TOKEN_NAME :'AUTH_ARCA',
  production: false,

  firebaseConfig : {
    apiKey: "AIzaSyBJmr_zsdrRV-XYxC85T9GLsURLTg2Eu0M",
    authDomain: "arca-e0cd9.firebaseapp.com",
    projectId: "arca-e0cd9",
    storageBucket: "arca-e0cd9.appspot.com",
    messagingSenderId: "1070847011124",
    appId: "1:1070847011124:web:68eee5c0df6b25f0021d61"
  }
  
};
