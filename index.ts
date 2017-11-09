/// <reference path="../../@types/dwt/index.d.ts" />

import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MatSelectModule,
  MatSlideToggleModule,
  MatCheckboxModule
} from '@angular/material';

import { ContainerComponent } from './container/container.component';
import { ExcludePagesComponent } from './exclude-pages/exclude-pages.component';
import { ScanButtonDirective } from './scan-button/scan-button.directive';
import { CurrentPageComponent } from './pagination/current-page.component';
import { TotalPagesComponent } from './pagination/total-pages.component';
import { NextPageButtonDirective } from './pagination/next-page-button.directive';
import { PreviousPageButtonDirective } from './pagination/previous-page-button.directive';
import { FirstPageButtonDirective } from './pagination/first-page-button.directive';
import { LastPageButtonDirective } from './pagination/last-page-button.directive';
import { SaveAllButtonDirective } from './save/save-all-button.directive';
import { SaveSelectedButtonDirective } from './save/save-selected-button.directive';
import { ScannerSelectComponent } from './settings/scanner-select.component';

import { DynamsoftService } from './dynamsoft.service';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';

const components = [
  ContainerComponent,
  ExcludePagesComponent,
  ScanButtonDirective,
  CurrentPageComponent,
  TotalPagesComponent,
  NextPageButtonDirective,
  PreviousPageButtonDirective,
  FirstPageButtonDirective,
  LastPageButtonDirective,
  SaveAllButtonDirective,
  SaveSelectedButtonDirective,
  ScannerSelectComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatCheckboxModule
  ],
  exports: [components],
  declarations: [components],
  providers: [DynamsoftService]
})
export class DynamsoftModule {

  constructor (@Optional() @SkipSelf() parentModule: DynamsoftModule) {
    if (parentModule) {
      throw new Error(
        'DynamsoftModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: DynamsoftServiceConfig): ModuleWithProviders {
    return {
      ngModule: DynamsoftModule,
      providers: [
        { provide: DynamsoftServiceConfig, useValue: config }
      ]
    };
  }
}
