declare var require: any;

import 'core-js/es6';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';
import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/fake-async-test';

import 'rxjs/Rx';

import { setBaseTestProviders } from '@angular/core/testing';

import {
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
} from '@angular/platform-browser-dynamic/testing';

setBaseTestProviders(
  TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

const testsContext = require.context('../src', true, /\.spec\.ts/);
const modules  = testsContext.keys();

modules.forEach(testsContext);