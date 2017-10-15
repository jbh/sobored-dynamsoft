import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-save-selected-button]' })
export class SaveSelectedButtonDirective {

  @Input('sb-dynamsoft-save-selected-button') fileType: string;
  availableFileTypes = ['tiff', 'pdf'];

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.saveSelected();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  saveSelected(): void {
    this.dynamsoftService.saveAll(this.availableFileTypes.includes(this.fileType) ? this.fileType : 'pdf');
  }

}
