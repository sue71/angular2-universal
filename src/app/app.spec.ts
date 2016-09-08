import {
  describe,
  it,
  expect,
  beforeEachProviders,
  inject,
} from '@angular/core/testing';

// Load the implementations that should be tested
import { App } from './app.component';
import { HTTP_PROVIDERS } from '@angular/http';

describe('App', () => {

  beforeEachProviders(() => [
    HTTP_PROVIDERS,
    App
  ]);

  it('Check if it works', inject([ App ], (app: App) => {
    expect(app.title).toEqual('beauty-admin');
  }));

});