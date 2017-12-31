// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAvYpiHqij5cUfjV2S0ywqciQtsW6vZemg",
    authDomain: "andrew-foust-kid-games.firebaseapp.com",
    databaseURL: "https://andrew-foust-kid-games.firebaseio.com",
    projectId: "andrew-foust-kid-games",
    storageBucket: "andrew-foust-kid-games.appspot.com",
    messagingSenderId: "523334340009"
  }
};
