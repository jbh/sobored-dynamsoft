import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-current-page',
  templateUrl: './page-number.component.html',
  styleUrls: ['./page-number.component.scss']
})
export class CurrentPageComponent {

  pageNumber: number;

  constructor(private ref: ChangeDetectorRef, private dynamsoftService: DynamsoftService) {
    this.dynamsoftService.onWebTwainReady.subscribe((dwObject) => {
      this.updatePageNumber(dwObject.CurrentImageIndexInBuffer + 1);
    });

    this.dynamsoftService.onBitmapChanged.subscribe((dwObject) => {
      this.updatePageNumber(dwObject.CurrentImageIndexInBuffer + 1);
    });
  }

  updatePageNumber(page): void {
    this.pageNumber = page;
    this.ref.detectChanges();
  }

}
