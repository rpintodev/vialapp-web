import { Component } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { TablerIconsModule } from "angular-tabler-icons";

@Component({
    selector: 'app-top-card',
    imports: [MatCardModule, TablerIconsModule, MatButtonModule],
    templateUrl: './top-cards.component.html',
})

export class AppTopCardComponent{
    constructor(){}
}