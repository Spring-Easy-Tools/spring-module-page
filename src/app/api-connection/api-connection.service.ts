import {Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom, interval, Observable, Subject} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {Temporal} from "@js-temporal/polyfill";
import {HeadersService} from "./headers.service";

const pingIntervalMs = Temporal.Duration.from({
    seconds: 0,
    minutes: 1,
}).total("millisecond");

@Injectable({
    providedIn: "root",
})
export class ApiConnectionService implements OnInit {

    private readonly serverOnlineSubject = new Subject<boolean>();
    private readonly serverAuthSubject = new Subject<boolean>();

    constructor(
        private readonly http: HttpClient,
        private readonly logger: NGXLogger,
        private readonly headersService: HeadersService,
    ) {
    }

    get serverOnline$(): Observable<boolean> {
        return this.serverOnlineSubject;
    }

    get serverAuth$(): Observable<boolean> {
        return this.serverAuthSubject;
    }

    ngOnInit(): void {
        // todo: ngOnInit() не работает в сервисах? Не работает.
        //  https://stackoverflow.com/questions/35110690/ngoninit-not-being-called-when-injectable-class-is-instantiated
        this.logger.debug("Сервис инициализирован");
    }

    startPingChecking() {
        this.pingStep(-1).then();
        this.logger.log(`Интервал пингования онлайна сервера ${pingIntervalMs} мс`);
        interval(pingIntervalMs).subscribe({next: value => this.onNextPingInterval(value)});
    }

    startAuthPingChecking() {
        this.pingAuthStep(-1).then();
        this.logger.log(`Интервал пингования сессии сервера ${pingIntervalMs} мс`);
        interval(pingIntervalMs).subscribe({next: value => this.pingAuthStep(value).then()});
    }

    private async onNextPingInterval(value: number) {
        await this.pingStep(value);
    }

    private async pingAuthStep(value: number) {
        this.logger.log(`Пингуем сессию сервера ${value + 1} раз(а)`);
        let result: boolean;
        try {
            let pingResult = await firstValueFrom(this.http.get(
                `${environment.serverUrl}/ping/auth`,
                {
                    headers: this.headersService.sessionHeader,
                    observe: "response",
                    withCredentials: true,
                }));
            this.logger.trace(pingResult);
            result = true;
        } catch (e) {
            this.logger.warn(`Ошибка пинга авторизации сервера: ${e}`);
            result = false;
        }
        this.serverAuthSubject.next(result);
    }

    private async pingStep(value: number) {
        this.logger.log(`Пингуем онлайн сервера ${value + 1} раз(а)`);
        let result: boolean;
        try {
            let pingResult = await firstValueFrom(this.http.get(
                `${environment.serverUrl}/ping`,
                {observe: "response"}));
            this.logger.trace(pingResult);
            result = true;
        } catch (e) {
            this.logger.warn(`Ошибка пинга сервера: ${e}`);
            result = false;
        }
        this.serverOnlineSubject.next(result);
    }
}
