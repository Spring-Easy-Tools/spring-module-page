import {Component, inject, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SpringAuthorizationService} from "./spring/spring-authorization.service";
import {FirebaseService} from "./firebase/firebase.service";
import {firstValueFrom} from "rxjs";
import {Auth, User} from "@angular/fire/auth";
import {MatSnackBar} from "@angular/material/snack-bar";
import * as firebaseui from 'firebaseui';
import {environment} from "../../environments/environment";

export const authRecordParameter = "auth-record-uuid";

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.scss"],
})
export class AuthorizationComponent implements OnInit {

  public authRecordUuid: string | null = null;
  private auth = inject(Auth);

  constructor(
    readonly springAuthorizationService: SpringAuthorizationService,
    readonly activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly firebaseService: FirebaseService,
    readonly snackBar: MatSnackBar,
  ) {
  }

  async ngOnInit() {
    const authUI = new firebaseui.auth.AuthUI(this.auth);
    // The start method will wait until the DOM is loaded.
    authUI.start("#firebase-ui", environment.firebaseUiAuthConfig);
    this.authRecordUuid = this.activatedRoute.snapshot.params[authRecordParameter];
    let user = await firstValueFrom(this.firebaseService.user$);
    await this.checkAuthorization(user);
    this.auth.onAuthStateChanged(value => {
      this.checkAuthorization(value);
    });
  }

  async onLogoutClick($event: MouseEvent) {
    await this.firebaseService.logout();
    await this.router.navigateByUrl("/auth");
  }

  private async checkAuthorization(user: User | null) {
    console.log("Проверяем имеющуюся авторизацию");
    if (user == null) {
      console.log("Пользователь Firebase не найден, разлогиниваем...");
      await this.firebaseService.logout();
    } else {
      try {
        console.log("Пользователь Firebase найден, пингуем авторизацию на сервере...");
        await firstValueFrom(this.springAuthorizationService.pingAuth());
        this.router.navigateByUrl("/data").then();
      } catch (e) {
        this.snackBar.open(`Успешная авторизация`);
      }
    }
  }
}
