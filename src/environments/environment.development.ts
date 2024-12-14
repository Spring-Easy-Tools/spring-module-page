import * as firebaseCredentials from "../assets/credentials/firebase_credentials.json";
/** Сломается, если перевести на default импорт */
import * as firebaseui from 'firebaseui';
import firebase from "firebase/compat/app";

export const environment = {
  appName: "Spring Tools Debug Example",
  serverUrl: "https://spring-tools.ru:8080",
  firebaseUiAuthConfig: {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "<your-tos-link>",
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  } as firebaseui.auth.Config,
  firebaseCredentials: firebaseCredentials,
};
