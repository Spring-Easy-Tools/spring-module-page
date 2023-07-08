import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {map, mergeMap, Observable} from "rxjs";
import {toHeaders, SpringAuthorizationService} from "../../authorization/spring/spring-authorization.service";
import {UserSettingsDto} from "./user-settings.dto";
import {StatsDto} from "./stats.dto";

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(
    readonly http: HttpClient,
    readonly springAuthService: SpringAuthorizationService,
  ) {
  }

  public getAllStatistic(): Observable<StatsDto> {
    return this.springAuthService.formBearerHeader().pipe(
      map(toHeaders),
      mergeMap(headers => this.http.get<StatsDto>(
        `${environment.serverUrl}/stats/all`, this.withParams(headers)))
    )
  }

  public getMyStatistic(): Observable<StatsDto> {
    return this.springAuthService.formBearerHeader().pipe(
      map(toHeaders),
      mergeMap(headers => this.http.get<StatsDto>(
        `${environment.serverUrl}/stats/my`, this.withParams(headers))))
  }

  public getUserSettings(): Observable<UserSettingsDto> {
    return this.springAuthService.formBearerHeader().pipe(
      map(toHeaders),
      mergeMap(value => this.http.get<UserSettingsDto>(
        `${environment.serverUrl}/user_settings`, this.withParams(value))))
  }

  private withParams(headers: HttpHeaders) {
    return {headers: headers, withCredentials: true}
  }
}
