import { AfterViewInit, ChangeDetectorRef, Component, Input } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-total-pages',
  templateUrl: './page-number.component.html',
  styleUrls: ['./page-number.component.scss']
})
export class TotalPagesComponent implements AfterViewInit {

  pageNumber: number;

  constructor(private ref: ChangeDetectorRef, private dynamsoftService: DynamsoftService) {
    this.dynamsoftService.onWebTwainReady.subscribe((dwObject) => {
      this.updatePageNumber(dwObject.HowManyImagesInBuffer);
    });

    this.dynamsoftService.onBitmapChanged.subscribe((dwObject) => {
      this.updatePageNumber(dwObject.HowManyImagesInBuffer);
    });
  }

  updatePageNumber(page): void {
    this.pageNumber = page;
    this.ref.detectChanges();
  }

  ngAfterViewInit(): void {
  }

}
