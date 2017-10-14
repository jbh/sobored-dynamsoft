import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-scan-button]' })
export class ScanButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.acquireImage();
    }
  }

  acquireImage(): void {
    this.dynamsoftService.acquireImage();
  }

}
