import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.browser.module';
import { enableProdMode } from '@angular/core';
enableProdMode();
platformBrowserDynamic().bootstrapModule(AppModule);
