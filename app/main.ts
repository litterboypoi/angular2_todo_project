/**
 * Created by shigure on 2017/5/16.
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { AppModule } from './app.module';

const platform = platformBrowserDynamic();
platform.bootstrapModule(AppModule);