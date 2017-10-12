import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'sb-dynamsoft-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements AfterViewInit {

  @Input() container: string;
  @Input() width: string | number;
  @Input() height: string | number;

  ngAfterViewInit() {
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
