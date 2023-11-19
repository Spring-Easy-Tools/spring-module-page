import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {UserSettingsDto} from "./user-settings.dto";
import {StatsDto} from "./stats.dto";
import {HeadersService} from "../../api-connection/headers.service";

@Injectable({
    providedIn: "root",
})
export class DataProviderService {

    constructor(
        readonly http: HttpClient,
        private readonly headersService: HeadersService,
    ) {
    }

    public getAllStatistic(): Observable<StatsDto> {
        return this.http.get<StatsDto>(`${environment.serverUrl}/stats/all`, {
            headers: this.headersService.sessionHeader, withCredentials: true,
        });
    }

    public getMyStatistic(): Observable<StatsDto> {
        return this.http.get<StatsDto>(`${environment.serverUrl}/stats/my`, {
            headers: this.headersService.sessionHeader, withCredentials: true,
        });
    }

    public getUserSettings(): Observable<UserSettingsDto> {
        return this.http.get<UserSettingsDto>(`${environment.serverUrl}/user_settings`, {
            headers: this.headersService.sessionHeader, withCredentials: true,
        });
    }
}
