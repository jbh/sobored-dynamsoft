import { Directive, ElementRef, HostBinding, HostListener, Input, Renderer } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Directive({ selector: '[sb-dynamsoft-save-all-button]' })
export class SaveAllButtonDirective {

  @Input('sb-dynamsoft-save-all-button') fileType: string;
  availableFileTypes = ['tiff', 'pdf'];

  @HostListener('click', ['$event'])
  handleClick(event: Event) {
    if (this.el.nativeElement.contains(event.target)) {
      this.saveAll();
    }
  }

  constructor(private el: ElementRef, private renderer: Renderer, private dynamsoftService: DynamsoftService) { }

  saveAll(): void {
    this.dynamsoftService.saveAll(this.availableFileTypes.includes(this.fileType) ? this.fileType : 'pdf');
  }

}
