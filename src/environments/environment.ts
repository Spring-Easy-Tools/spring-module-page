import {firebase, firebaseui, NativeFirebaseUIAuthConfig} from "firebaseui-angular";
import * as firebaseCredentials from "../assets/credentials/firebase_credentials.json"

export const environment = {
  appName: "Spring Tools Example",
  serverUrl: "http://localhost:8080",
  firebaseUiAuthConfig: {
    signInFlow: "popup",
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    tosUrl: "<your-tos-link>",
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
  } as NativeFirebaseUIAuthConfig,
  firebaseCredentials: firebaseCredentials,
}
