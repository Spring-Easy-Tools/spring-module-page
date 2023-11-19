import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {firstValueFrom} from "rxjs";
import {NGXLogger} from "ngx-logger";
import {ApiConnectionService} from "../../api-connection/api-connection.service";
import {
    FirebaseAuthHeader,
    HeadersService,
    sessionHeaderName,
    SpringSessionHeader,
} from "../../api-connection/headers.service";

@Injectable({
    providedIn: "root",
})
export class SpringAuthorizationService {

    constructor(
        readonly http: HttpClient,
        private readonly logger: NGXLogger,
        private readonly apiConnectionService: ApiConnectionService,
        private readonly headersService: HeadersService,
    ) {
    }

    public async auth(firebaseIdToken: string) {
        this.logger.log("Начинаем авторизацию Spring");
        let firebaseAuthHeader = {Authorization: `Bearer ${firebaseIdToken}`} as FirebaseAuthHeader;
        this.logger.trace("Формируем хедеры для авторизации", firebaseAuthHeader);
        let authResult = await firstValueFrom(this.http.get(
            `${environment.serverUrl}/oauth/firebase`,
            {headers: firebaseAuthHeader, observe: "response", withCredentials: true}));
        this.logger.trace(authResult);
        let xAuthToken = authResult.headers.get(sessionHeaderName)!!;
        let authPingHeader = {"X-Auth-Token": xAuthToken} as SpringSessionHeader;
        this.logger.trace("Формируем хедеры для пинга авторизации", authPingHeader);
        let authPingResult = await firstValueFrom(this.http.get(
            `${environment.serverUrl}/ping/auth`,
            {headers: authPingHeader, observe: "response", withCredentials: true}));
        this.logger.trace(authPingResult);
        this.headersService.saveSession(xAuthToken);
        this.apiConnectionService.startAuthPingChecking();
    }

    async logout() {
        // todo: Сделать разлогин в спринге
        throw Error("Not implemented!");
    }

}
