import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-previous-page-button]' })
export class PreviousPageButtonDirective {

  @HostBinding('disabled') disabled: boolean;

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.previousPage();
    }
  }

  previousPage(): void {
    const currentPage = this.dynamsoftService.getCurrentImageIndex();
    this.dynamsoftService.changeImageIndex(currentPage - 1);
  }

}
