import {Injectable} from "@angular/core";

export const sessionHeaderName = "X-Auth-Token";
export const sessionHeaderStorageName = "session-header";

export type SpringSessionHeader = {
    "X-Auth-Token": string
}

export type FirebaseAuthHeader = {
    Authorization: string
}

@Injectable({
    providedIn: "root",
})
export class HeadersService {

    constructor() {
    }

    get sessionHeader() {
        let xAuthToken = localStorage.getItem(sessionHeaderStorageName);
        return {
            "X-Auth-Token": xAuthToken,
        } as SpringSessionHeader;
    }

    saveSession(token: string) {
        localStorage.setItem(sessionHeaderStorageName, token);
    }

}
