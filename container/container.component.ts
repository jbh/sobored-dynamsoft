import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';

import { DynamsoftService } from '../dynamsoft.service';

@Component({
  selector: 'sb-dynamsoft-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit {

  container: string;
  @Input() width: string | number;
  @Input() height: string | number;
  @Input() cols: number;
  @Input() rows: number;

  constructor(private dynamsoftService: DynamsoftService) {
    this.container = dynamsoftService.container;
  }

  ngAfterViewInit() {
    if (!Dynamsoft.WebTwainEnv.AutoLoad) {
      Dynamsoft.WebTwainEnv.Load();
    }

    Dynamsoft.WebTwainEnv.RegisterEvent('OnWebTwainReady', () => {
      const dwObject = Dynamsoft.WebTwainEnv.GetWebTwain(this.container);
      const cols = this.cols > 0 || this.cols == -1 ? this.cols : 1;
      const rows = this.rows > 0 || this.rows == -1 ? this.rows : 1;
      this.dynamsoftService.triggerOnWebTwainReady(dwObject);

      dwObject.SetViewMode(cols, rows);

      dwObject.RegisterEvent('OnTopImageInTheViewChanged', (index) => {
        dwObject.CurrentImageIndexInBuffer = index;
        this.dynamsoftService.triggerOnTopImageInTheViewChanged(index);
      });

      dwObject.RegisterEvent('OnBitmapChanged', () => {
        this.dynamsoftService.triggerOnBitmapChanged(dwObject);
      });
    });

    if (this.width && this.height) {
      const widthAsNumber = Number(this.width);
      const heightAsNumber = Number(this.height);
      Dynamsoft.WebTwainEnv.Containers = [
        {
          ContainerId: this.container,
          Width: isNaN(widthAsNumber) ? this.width : widthAsNumber,
          Height: isNaN(heightAsNumber) ? this.height : heightAsNumber
        }
      ];
    }
  }

}
