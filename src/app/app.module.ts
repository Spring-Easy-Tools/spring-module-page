import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {DataComponent} from "./data/data.component";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService} from "@angular/fire/analytics";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireModule} from "@angular/fire/compat";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    AuthorizationComponent,
    DataComponent,
  ],
  bootstrap: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    MatButtonModule,
    MatToolbarModule,
    AngularFireModule.initializeApp(environment.firebaseCredentials),
    AngularFireAuthModule,
    MatSnackBarModule,
  ],
  providers: [
    ScreenTrackingService, UserTrackingService,
    provideHttpClient(withInterceptorsFromDi()),
    provideFirebaseApp(() => initializeApp(environment.firebaseCredentials)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
  ],
})
export class AppModule {
}
