import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ZoomWebViewComponent } from "./components/zoom-web-view/zoom-web-view.component";
import { NgControlModule } from "../ng-control";
import { ZoomAuthorizeComponent } from "./components/zoom-authorize/zoom-authorize.component";

@NgModule({
    declarations: [ZoomWebViewComponent, ZoomAuthorizeComponent],
    imports: [CommonModule, NgControlModule],
    exports: [ZoomWebViewComponent, ZoomAuthorizeComponent],
})
export class ZoomModule {}
