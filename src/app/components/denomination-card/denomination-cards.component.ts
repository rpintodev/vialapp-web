import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { TablerIconsModule } from "angular-tabler-icons";
import { IBoveda } from "src/app/models/boveda";
import { BovedaService } from "src/app/services/boveda/boveda.service";

@Component({
    selector: 'app-denomination-card',
    imports: [MatCardModule, TablerIconsModule, MatButtonModule],
    templateUrl: './denomination-cards.component.html',
})

export class AppDenominationCardComponent{
    constructor(private bovedaState: BovedaService){}
    ultimaBoveda: IBoveda | null = null;
    ultimaBovedaValor: IBoveda;
    ngOnInit(){
        this.bovedaState.ultimaBoveda$.subscribe((data:IBoveda | null) => {
            this.ultimaBoveda = {
                moneda1: data?.moneda1 ,
                billete5: data?.billete5 ,
                billete10: data?.billete10,
                billete20: data?.billete20,
                total: data?.total
            };
            this.ultimaBovedaValor = {
                moneda1: data?.moneda1 ,
                billete5: (parseInt(data?.billete5??"0")*5).toString(),
                billete10: (parseInt(data?.billete10??"0")*10).toString(),
                billete20: (parseInt(data?.billete20??"0")*20).toString(),
                
            };
        })
    }
    
}