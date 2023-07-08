import {Injectable} from "@angular/core"
import {HttpClient, HttpHeaders} from "@angular/common/http"
import {environment} from "../../../environments/environment"
import {filter, map, mergeMap} from "rxjs"
import {FirebaseService} from "../firebase/firebase.service";
import {User} from "@angular/fire/auth";

@Injectable({
  providedIn: "root",
})
export class SpringAuthorizationService {

  constructor(readonly http: HttpClient, readonly firebaseService: FirebaseService) {
  }

  public pingAuth() {
    return this.formBearerHeader().pipe(
      map(toHeaders),
      mergeMap(httpHeaders => this.makePingRequest(httpHeaders))
    )
  }

  public springAuth() {
    return this.formBearerHeader().pipe(
      map(toHeaders),
      mergeMap(httpHeaders => this.makeAuthRequest(httpHeaders))
    )
  }

  public formBearerHeader() {
    return this.firebaseService.user$.pipe(
      filter(value => value != null),
      map(value => value as User),
      mergeMap(value => value.getIdToken()),
      map(value => `Bearer ${value}`)
    )
  }

  private makeAuthRequest(headers: HttpHeaders) {
    return this.http.get(`${environment.serverUrl}/oauth/firebase`, withOptions(headers));
  }

  private makePingRequest(headers: HttpHeaders) {
    return this.http.get(`${environment.serverUrl}/ping/auth`, withOptions(headers));
  }
}

export function toHeaders(bearerHeader: string) {
  return new HttpHeaders({Authorization: bearerHeader});
}

export function withOptions(headers: HttpHeaders) {
  return {
    headers: headers,
    withCredentials: true,
  }
}
