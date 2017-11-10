import {AfterViewInit, Component, EventEmitter, Input, Output} from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-append-image',
  templateUrl: './append-image.component.html',
  styleUrls: ['./append-image.component.scss']
})
export class AppendImageComponent implements AfterViewInit{

  allowedInputTypes = ['checkbox', 'slideToggle'];
  @Input('input-value') inputValue: boolean = true;
  @Input('input-type') inputType: string = 'slideToggle';
  @Input() label: string = 'Append Image';

  constructor(private dynamsoftService: DynamsoftService) { }

  onInputChanged(): void {
    this.dynamsoftService.options.appendImage = this.inputValue;
  }

  ngAfterViewInit(): void {
    this.inputType = this.allowedInputTypes.includes(this.inputType) ? this.inputType : 'slideToggle';
    this.dynamsoftService.options.appendImage = this.inputValue;
  }

}
