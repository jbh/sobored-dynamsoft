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

  constructor(@Optional() config: DynamsoftServiceConfig) {
    if (config) {
      this.dynamsoft_key = config.dynamsoft_key;
      this.container = config.container ? config.container : 'dwtcontrolContainer';
    }
  }

  acquireImage() {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    dwObject.ProductKey = this.dynamsoft_key;
    
    const bSelected = dwObject.SelectSource();
    if (bSelected) {
      const onAcquireImageSuccess = () => {
        dwObject.CloseSource();
      };
      const onAcquireImageFailure = onAcquireImageSuccess;
      dwObject.OpenSource();
      dwObject.AcquireImage({}, onAcquireImageSuccess, onAcquireImageFailure);
    }
  }

  getTotalImagesInBuffer(): number {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.container);
    return dwObject.HowManyImagesInBuffer;
  }

  getCurrentImageIndex(): number {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.container);
    return dwObject.CurrentImageIndexInBuffer;
  }

  changeImageIndex(index: number): void {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.container);

    if (dwObject.HowManyImagesInBuffer === 0 || index > dwObject.HowManyImagesInBuffer || index < 0) {
      return;
    }

    dwObject.CurrentImageIndexInBuffer = index;
  }

  triggerOnTopImageInTheViewChanged(index: number) {
    this._onTopImageInTheViewChanged.next(index);
  }

  triggerOnWebTwainReady(dwObject: any) {
    this._onWebTwainReady.next(dwObject);
  }

  triggerOnBitmapChanged(dwObject: any) {
    this._onBitmapChanged.next(dwObject);
  }

}
