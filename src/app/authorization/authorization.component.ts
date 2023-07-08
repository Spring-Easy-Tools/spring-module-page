import {Component, OnInit} from "@angular/core"
import {ActivatedRoute, Router} from "@angular/router"
import {FirebaseUISignInFailure, FirebaseUISignInSuccessWithAuthResult} from "firebaseui-angular"
import {SpringAuthorizationService} from "./spring/spring-authorization.service"
import {FirebaseService} from "./firebase/firebase.service";
import {firstValueFrom} from "rxjs";
import {User} from "@angular/fire/auth";
import {MatSnackBar} from "@angular/material/snack-bar";

export const authRecordParameter = "auth-record-uuid"

@Component({
  selector: "app-authorization",
  templateUrl: "./authorization.component.html",
  styleUrls: ["./authorization.component.scss"],
})
export class AuthorizationComponent implements OnInit {

  public authRecordUuid: string | null = null;

  constructor(
    readonly springAuthorizationService: SpringAuthorizationService,
    readonly activatedRoute: ActivatedRoute,
    readonly router: Router,
    readonly firebaseService: FirebaseService,
    readonly snackBar: MatSnackBar,
  ) {
  }

  async ngOnInit() {
    this.authRecordUuid = this.activatedRoute.snapshot.params[authRecordParameter]
    this.firebaseService.user$.subscribe(value => this.checkAuthorization(value))
  }

  onSignInFailure($event: FirebaseUISignInFailure) {
    this.snackBar.open(`Код ошибки авторизации Firebase: ${$event.code}`)
  }

  async onSignInSuccess($event: FirebaseUISignInSuccessWithAuthResult) {
    this.snackBar.open(`Успешная авторизация`)
    try {
      await firstValueFrom(this.springAuthorizationService.springAuth())
      this.router.navigateByUrl("/data").then()
    } catch (e) {
      this.snackBar.open(`Ошибка авторизации Spring: ${e}`)
      await this.firebaseService.logout()
    }
  }

  async onLogoutClick($event: MouseEvent) {
    await this.firebaseService.logout()
    await this.router.navigateByUrl("/auth")
  }

  private async checkAuthorization(user: User | null) {
    console.log("Проверяем имеющуюся авторизацию")
    if (user == null) {
      console.log("Пользователь Firebase не найден, разлогиниваем...")
      await this.firebaseService.logout()
    } else {
      try {
        console.log("Пользователь Firebase найден, пингуем авторизацию на сервере...")
        await firstValueFrom(this.springAuthorizationService.pingAuth())
        this.router.navigateByUrl("/data").then()
      } catch (e) {
        this.snackBar.open(`Успешная авторизация`)
      }
    }
  }
}
