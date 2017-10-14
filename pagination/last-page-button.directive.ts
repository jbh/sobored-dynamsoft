import { Directive, ElementRef, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-last-page-button]' })
export class LastPageButtonDirective {

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.lastPage();
    }
  }

  lastPage(): void {
    this.dynamsoftService.changeImageIndex(this.dynamsoftService.getTotalImagesInBuffer() - 1);
  }

}
