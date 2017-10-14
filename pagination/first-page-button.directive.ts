import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-first-page-button]' })
export class FirstPageButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.firstPage();
    }
  }

  firstPage(): void {
    this.dynamsoftService.changeImageIndex(0);
  }

}
