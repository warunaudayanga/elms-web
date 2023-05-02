import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HomepageComponent } from "./components/homepage/homepage.component";
import { HomepageRoutingModule } from "./homepage-routing.module";
import { NgControlModule } from "../../core/modules/ng-control";

@NgModule({
    declarations: [HomepageComponent],
    imports: [CommonModule, HomepageRoutingModule, NgControlModule],
    exports: [HomepageComponent],
})
export class HomepageModule {}
