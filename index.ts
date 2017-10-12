import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';

const components = [ContainerComponent];

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [components],
  declarations: [components]
})
export class DynamsoftModule { }
