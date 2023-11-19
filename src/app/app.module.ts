import {isDevMode, NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {AppRoutingModule} from "./app-routing.module";
import {AuthorizationComponent} from "./authorization/authorization.component";
import {environment} from "../environments/environment";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {RouterOutlet} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {getAnalytics, provideAnalytics} from "@angular/fire/analytics";
import {getAuth, provideAuth} from "@angular/fire/auth";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {StatusComponent} from "./status/status/status.component";
import {LoggerModule, NgxLoggerLevel} from "ngx-logger";

const logLevel = isDevMode()
    ? NgxLoggerLevel.TRACE
    : NgxLoggerLevel.WARN;

@NgModule({
    declarations: [
        AppComponent,
        AuthorizationComponent,
        StatusComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterOutlet,
        MatButtonModule,
        MatToolbarModule,
        provideFirebaseApp(() => initializeApp(environment.firebaseCredentials)),
        provideAnalytics(() => getAnalytics()),
        provideAuth(() => getAuth()),
        MatSnackBarModule,
        LoggerModule.forRoot({level: logLevel}),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
