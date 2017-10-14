import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { ScanButtonDirective } from './scan-button/scan-button.directive';

import { DynamsoftService } from './dynamsoft.service';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';

const components = [ContainerComponent, ScanButtonDirective];

@NgModule({
  imports: [
    CommonModule
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
