"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var app_browser_module_1 = require("./app.browser.module");
//enableProdMode();
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_browser_module_1.AppModule);
