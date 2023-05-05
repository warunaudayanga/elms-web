import { enableProdMode, Injector, NgModuleRef } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";
import { environment } from "./environments/environment";
import { HttpClient, HttpXhrBackend } from "@angular/common/http";
import { ConfigService } from "./app/core/services/config.service";

if (environment.production) {
    enableProdMode();
}

export let applicationInjector: Injector;

// eslint-disable-next-line func-style
async function bootstrap(): Promise<NgModuleRef<AppModule>> {
    // Load environment data before the application starts
    const http = new HttpClient(new HttpXhrBackend({ build: (): XMLHttpRequest => new XMLHttpRequest() }));
    const configService = new ConfigService(http);
    await configService.loadEnvironment();
    return platformBrowserDynamic([
        {
            provide: "config",
            useValue: configService.config,
        },
    ]).bootstrapModule(AppModule);
}

bootstrap()
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

// Notification Events
// 01. New class request
// 02. Class request accepted
// 03. Class request declined
// 04. Assessment created
// 04. Assessment started
// 05. Student joined
// 06. Class started
// 07. Class cancellation
