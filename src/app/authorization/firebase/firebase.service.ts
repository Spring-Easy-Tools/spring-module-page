import {inject, Injectable} from "@angular/core";
import {Auth, authState, User} from "@angular/fire/auth";
import {NGXLogger} from "ngx-logger";

@Injectable({
    providedIn: "root",
})
export class FirebaseService {

    auth: Auth = inject(Auth);
    public authState$ = authState(this.auth);

    constructor(private readonly logger: NGXLogger) {
        this.authState$.subscribe(value => this.logAuthState(value));
    }

    public async logout() {
        await this.auth.signOut();
    }

    private logAuthState(value: User | null) {
        this.logger.trace("Регистрация пользователя Firebase", value);
    }

}
