import { Inject, Injectable, Optional } from '@angular/core';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';
import { Subject } from 'rxjs/Subject';
import { Observable } from "rxjs/Observable";

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

  constructor(@Optional() config: DynamsoftServiceConfig) {
    if (config) {
      this.dynamsoft_key = config.dynamsoft_key;
      this.container = config.container ? config.container : 'dwtcontrolContainer';
    }
  }

  acquireImage(): void {
    this.dwObject.ProductKey = this.dynamsoft_key;
    
    const bSelected = this.dwObject.SelectSource();
    if (bSelected) {
      const onAcquireImageSuccess = () => {
        this.dwObject.CloseSource();
      };
      const onAcquireImageFailure = onAcquireImageSuccess;
      this.dwObject.OpenSource();
      this.dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    }
  }

  saveAll(type: string): void {
    console.log(type);
    switch (type) {
      case 'tiff':
        console.log(this.dwObject);
        break;
      case 'pdf':

        break;
      default:

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
    this.dwObject = dwObject;
    this._onWebTwainReady.next(dwObject);
  }

  triggerOnBitmapChanged(dwObject: any) {
    this._onBitmapChanged.next(dwObject);
  }

}
