import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-exclude-pages',
  templateUrl: './exclude-pages.component.html',
  styleUrls: ['./exclude-pages.component.scss']
})
export class ExcludePagesComponent implements AfterViewInit{

  allowedInputTypes = ['checkbox', 'slideToggle'];
  @Input('input-value') inputValue: boolean = false;
  @Input('input-type') inputType: string = 'slideToggle';
  @Input() label: string = 'Exclude Blank Pages';

  constructor(private dynamsoftService: DynamsoftService) { }

  onInputChanged(): void {
    this.dynamsoftService.options.excludeBlankPages = this.inputValue;
  }

  ngAfterViewInit(): void {
    this.inputType = this.allowedInputTypes.includes(this.inputType) ? this.inputType : 'slideToggle';
    this.dynamsoftService.options.excludeBlankPages = this.inputValue;
  }

}
