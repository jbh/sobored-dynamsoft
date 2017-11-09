import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-scan-button]' })
export class ScanButtonDirective {

  @Input('sb-dynamsoft-scan-button') pageCount: number;

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.acquireImage();
    }
  }

  acquireImage(): void {
    this.dynamsoftService.options.transferCount = this.pageCount > 0 ? this.pageCount : -1;
    this.dynamsoftService.acquireImage();
  }

}
