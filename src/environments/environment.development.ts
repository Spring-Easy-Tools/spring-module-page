import {firebase, firebaseui} from "firebaseui-angular";
import * as webCredentials from "../assets/credentials/firebase_web_credentials.json";

export const environment = {
  appName: "Spring Tools Debug Example",
  serverUrl: "http://localhost:8080",
  firebaseUiAuthConfig: {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    //term of service
    tosUrl: "<your-tos-link>",
    //privacy url
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    //credentialHelper: firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  } as firebaseui.auth.Config,
  firebaseConfig: webCredentials,
};
