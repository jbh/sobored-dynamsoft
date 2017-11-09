import { ChangeDetectorRef, Component, Input } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-scanner-select',
  templateUrl: './scanner-select.component.html'
})
export class ScannerSelectComponent {

  scanners: string[];
  selectedScanner: number;

  constructor(private ref: ChangeDetectorRef, private dynamsoftService: DynamsoftService) {
    this.scanners = this.dynamsoftService.scanners;
  }

  onScannerSelected(id: number): void {
    this.dynamsoftService.selectedScanner = id;
  }

}
