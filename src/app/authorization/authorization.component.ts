import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {SpringAuthorizationService} from "./spring/spring-authorization.service";
import {FirebaseService} from "./firebase/firebase.service";
import {User} from "@angular/fire/auth";
import * as firebaseUi from "firebaseui";
import firebase from "firebase/compat/app";
import {NGXLogger} from "ngx-logger";

const firebaseUiConfig = {
    signInFlow: "popup",
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
    //term of service
    tosUrl: "<your-tos-link>",
    //privacy url
    privacyPolicyUrl: "<your-privacyPolicyUrl-link>",
    //credentialHelper:             firebaseui.auth.CredentialHelper.ACCOUNT_CHOOSER_COM
    credentialHelper: firebaseUi.auth.CredentialHelper.NONE,
};

@Component({
    selector: "app-authorization",
    templateUrl: "./authorization.component.html",
    styleUrls: ["./authorization.component.scss"],
})
export class AuthorizationComponent implements OnInit {

    hasFirebaseUser?: boolean;

    // todo: сложить все обращение к серверу в Spring Service?
    constructor(
        readonly springAuthorizationService: SpringAuthorizationService,
        readonly router: Router,
        readonly firebaseService: FirebaseService,
        private readonly logger: NGXLogger,
    ) {
    }

    async ngOnInit() {
        const firebaseUiComponent = new firebaseUi.auth.AuthUI(this.firebaseService.auth);
        firebaseUiComponent.start("#firebase-ui-auth-container", firebaseUiConfig);
        this.firebaseService.authState$.subscribe({
            next: value => this.onFirebaseAuthSuccess(value),
            error: err => this.onFirebaseAuthError(err),
        });
    }

    async onLogoutClick($event: MouseEvent) {
        await this.firebaseService.logout();
        await this.springAuthorizationService.logout();
    }

    private async onFirebaseAuthSuccess(value: User | null) {
        if (value == null) {
            this.hasFirebaseUser = false;
            let error = Error("Авторизация Firebase прошла, но юзер null. Что-то невероятное");
            this.logger.error(error);
            throw error;
        } else {
            this.hasFirebaseUser = true;
            this.logger.log("Авторизация Firebase прошла, получаем idToken юзера...");
            let firebaseIdToken = await value.getIdToken(true);
            this.logger.log("idToken юзера получен", firebaseIdToken);
            await this.springAuthorizationService.auth(firebaseIdToken);
            this.logger.log("Авторизация Spring прошла");
        }
    }

    private onFirebaseAuthError(err: any) {
        throw new Error(err);
    }

}
