import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TablerIconsModule } from 'angular-tabler-icons';
import { IBoveda } from 'src/app/models/boveda';
import { BovedaDetailComponent } from '../boveda-detail/boveda-detail.component';
import { BovedaService } from 'src/app/services/boveda/boveda.service';
import { FormatValue } from 'src/app/utils/boveda.utils';

@Component({
  selector: 'app-boveda-settings',
  imports: [
    MatCardModule,
    TablerIconsModule
  ],
  templateUrl: './boveda-settings.component.html',
})
export class BovedaSettingsComponent implements OnInit{

  constructor(private bovedaService: BovedaService){};
  
  private modalService = inject(NgbModal);
  boveda: IBoveda;
  bovedaTag: IBoveda;

  async openBovedaModal(element: IBoveda){
    const modalRef = this.modalService.open(BovedaDetailComponent,{
      size: 'lg',
      scrollable: true,
      centered: true,
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static'
    });
    modalRef.componentInstance.boveda = element;
    modalRef.componentInstance.bovedaActualizada.subscribe(() => {
      this.LoadData(); // <-- Aquí actualizas la tabla
    });
    await modalRef.result;
  }
 
  private handleSuccess<T extends { total?: any }>(data: T, setter: (val: T) => void) {
  if (data && typeof data === 'object' && 'total' in data) {
    data.total = Number(data.total).toLocaleString('en-US', { minimumFractionDigits: 2 });
  }
  setter(data); 
}

  private getBovedaDetails(){
    this.bovedaService.getBoveda().subscribe({
      next:(data)=>{this.handleSuccess(data,val => this.boveda = val)},
      error:(error)=>{ console.error('Error fetching boveda details:', error)}
    });
  }
  
  private getBovedaTagDetails(){
    this.bovedaService.getBovedaTag().subscribe({
      next:(data)=>{this.handleSuccess(data,val => this.bovedaTag = val);},
      error:(error)=>{ console.error('Error fetching boveda details:', error)}
    });
  }

  private LoadData(){
    this.getBovedaDetails();
    this.getBovedaTagDetails();
  }

  ngOnInit(): void {
    this.LoadData();
  }
}
