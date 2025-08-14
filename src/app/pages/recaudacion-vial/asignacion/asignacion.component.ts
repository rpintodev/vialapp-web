import { Component } from '@angular/core';
import { BannerWorkComponent } from 'src/app/components/banner/banner-work/banner-work.component';
import { WorkTableComponent } from 'src/app/components/work-table/work-table.component';

@Component({
  selector: 'app-asignacion',
  imports: [BannerWorkComponent, WorkTableComponent],
  templateUrl: './asignacion.component.html',
})
export class AsignacionComponent {

}
