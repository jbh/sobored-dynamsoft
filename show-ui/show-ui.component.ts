import {AfterViewInit, Component, ContentChild, EventEmitter, Input, Output} from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-show-ui',
  templateUrl: './show-ui.component.html',
  styleUrls: ['./show-ui.component.scss']
})
export class ShowUiComponent implements AfterViewInit{

  allowedInputTypes = ['checkbox', 'slideToggle']
  @Input('input-value') inputValue: boolean = true;
  @Input('input-type') inputType: string = 'slideToggle';
  @Input() label: string = 'Show UI';

  constructor(private dynamsoftService: DynamsoftService) {}

  onInputChanged(): void {
    this.dynamsoftService.options.showUi = this.inputValue;
  }

  ngAfterViewInit(): void {
    this.inputType = this.allowedInputTypes.includes(this.inputType) ? this.inputType : 'slideToggle';
    this.dynamsoftService.options.showUi = this.inputValue;
  }

}
