import {Component, OnInit} from "@angular/core";
import {FirebaseService} from "../../authorization/firebase/firebase.service";
import {DataProviderService} from "../../data/spring/data-provider.service";
import {ApiConnectionService} from "../../api-connection/api-connection.service";

@Component({
    selector: "app-status",
    templateUrl: "./status.component.html",
    styleUrls: ["./status.component.scss"],
})
export class StatusComponent implements OnInit {

    firebaseStatus?: String;
    allDataStatus?: String;
    myDataStatus?: String;
    serverOnline: boolean = false;
    serverAuth: boolean = false;

    constructor(
        private firebaseService: FirebaseService,
        private dataService: DataProviderService,
        private connectionService: ApiConnectionService,
    ) {

    }

    async ngOnInit() {
        this.connectionService.startPingChecking();
        this.firebaseService.authState$.subscribe({
            next: value => this.firebaseStatus = JSON.stringify(value ? value.email : false),
        });
        this.dataService.getAllStatistic().subscribe({
            next: value => this.allDataStatus = JSON.stringify(value, undefined, "\t"),
        });
        this.dataService.getMyStatistic().subscribe({
            next: value => this.myDataStatus = JSON.stringify(value, undefined, "\t"),
        });
        this.connectionService.serverOnline$.subscribe({
            next: value => this.serverOnline = value,
        });
        this.connectionService.serverAuth$.subscribe({
            next: value => this.serverAuth = value,
        });
    }
}
