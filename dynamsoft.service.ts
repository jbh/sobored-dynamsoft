import { Inject, Injectable, Optional } from '@angular/core';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";
import {isNullOrUndefined} from "util";
import {isDefined} from "@angular/compiler/src/util";

@Injectable()
export class DynamsoftService {

  dynamsoft_key: string;
  container: string;
  _onTopImageInTheViewChanged = new Subject<number>();
  public get onTopImageInTheViewChanged(): Observable<number> { return this._onTopImageInTheViewChanged.asObservable(); }
  _onWebTwainReady = new Subject<any>();
  public get onWebTwainReady(): Observable<any> { return this._onWebTwainReady.asObservable(); }
  _onBitmapChanged = new Subject<any>();
  public get onBitmapChanged(): Observable<any> { return this._onBitmapChanged.asObservable(); }
  dwObject;
  scanners: string[] = [];
  options = {
    transferCount: -1
  };
  selectedScanner: number;

  constructor(@Optional() config: DynamsoftServiceConfig) {
    if (config) {
      this.dynamsoft_key = config.dynamsoft_key;
      this.container = config.container ? config.container : 'dwtcontrolContainer';
    }
  }

  acquireImage(): void {
    const scannerSelected = typeof this.selectedScanner !== 'undefined';
    const bSelected = scannerSelected ? this.dwObject.SelectSourceByIndex(this.selectedScanner) : this.dwObject.SelectSource();
    if (bSelected) {
      const onAcquireImageSuccess = () => {
        this.dwObject.CloseSource();
      };
      const onAcquireImageFailure = onAcquireImageSuccess;
      this.dwObject.OpenSource();
      this.dwObject.XferCount = this.options.transferCount;
      this.dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    }
  }

  saveAll(type: string): void {
    if (this.dwObject.HowManyImagesInBuffer <= 0) {
      return;
    }

    switch (type) {
      case 'tiff':
        this.dwObject.SaveAllAsMultiPageTIFF('');
        break;
      case 'pdf':
      default:
        this.dwObject.SaveAllAsPDF('');
    }
  }

  saveSelected(type:string): void {
    if (this.dwObject.HowManyImagesInBuffer <= 0) {
      return;
    }

    switch (type) {
      case 'tiff':
        this.dwObject.SaveSelectedImagesAsMultiPageTIFF('');
        break;
      case 'pdf':
      default:
        this.dwObject.SaveSelectedImagesAsMultiPagePDF('');
    }
  }

  getTotalImagesInBuffer(): number {
    return this.dwObject.HowManyImagesInBuffer;
  }

  getCurrentImageIndex(): number {
    return this.dwObject.CurrentImageIndexInBuffer;
  }

  changeImageIndex(index: number): void {
    if (this.dwObject.HowManyImagesInBuffer === 0 || index > this.dwObject.HowManyImagesInBuffer || index < 0) {
      return;
    }

    this.dwObject.CurrentImageIndexInBuffer = index;
  }

  triggerOnTopImageInTheViewChanged(index: number) {
    this._onTopImageInTheViewChanged.next(index);
  }

  triggerOnWebTwainReady(dwObject: any) {
    if (!this.dwObject) {
      this.dwObject = dwObject;
      this.dwObject.ProductKey = this.dynamsoft_key;
    }

    if (this.scanners.length === 0) {
      for (let i = 0; i < this.dwObject.SourceCount; i++) {
        this.scanners.push(this.dwObject.GetSourceNameItems(i));
      }
    }

    this._onWebTwainReady.next(dwObject);
  }

  triggerOnBitmapChanged(dwObject: any) {
    this._onBitmapChanged.next(dwObject);
  }

}
