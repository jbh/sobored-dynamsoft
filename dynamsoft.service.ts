import { Inject, Injectable, Optional } from '@angular/core';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';

@Injectable()
export class DynamsoftService {

  dynamsoft_key: string;
  container: string;

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

}
