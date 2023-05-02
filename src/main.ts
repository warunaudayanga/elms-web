import { enableProdMode, Injector } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";

if (environment.production) {
    enableProdMode();
}

export let applicationInjector: Injector;

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .then(componentRef => {
        applicationInjector = componentRef.injector;
    })
    .catch(err => console.error(err)); // eslint-disable-line no-console

// TODO:
// 01. Schedule 2.5 hours validation
// 02. Zoom Authorize
// 03. Handle currency
// 04. Textarea press enter to send
// 05. Track By ngFor
// 06. Create directives for template instead of using #var
// 06. Create directives for components instead of using ngVar
// 07. Calculate data-view limit according to heights
// 08. Logout button move to a menu
// 09. Handle errors in dialog, View error component
// 10. Date validator for form control
// 11. No result component
// 12. Set error card in class-info
// 13. Move zoom data to classRoom entity [backed]
// 14. Handle when change requests are declined
// 15. Create mixins
// 16. Virtual scrolling
