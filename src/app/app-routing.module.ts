import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {StatusComponent} from "./status/status/status.component";

const routes: Routes = [
    {path: "", redirectTo: "/status", pathMatch: "full"},
    {path: "status", component: StatusComponent},
];

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
        CommonModule,
    ],
})
export class AppRoutingModule {
}
