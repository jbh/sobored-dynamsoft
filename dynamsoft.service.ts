import { Inject, Injectable, Optional } from '@angular/core';
import { DynamsoftServiceConfig } from './dynamsoft-service-config.model';

@Injectable()
export class DynamsoftService {

  dynamsoft_key: string;

  constructor(@Optional() config: DynamsoftServiceConfig) {
    console.log(config);
    if (config) {
      this.dynamsoft_key = config.dynamsoft_key;
    }
  }

  acquireImage() {
    const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain('dwtcontrolContainer');
    console.log(this.dynamsoft_key);
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
