import { Component, Input } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-scan-button',
  templateUrl: './scan-button.component.html',
  styleUrls: ['./scan-button.component.scss']
})
export class ScanButtonComponent {

  constructor(private dynamsoftService: DynamsoftService) { }

  acquireImage(): void {
    this.dynamsoftService.acquireImage();
  }

}
