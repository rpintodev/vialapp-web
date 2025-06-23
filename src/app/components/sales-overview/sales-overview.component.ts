import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { TablerIconsModule } from 'angular-tabler-icons';
import {provideNativeDateAdapter} from '@angular/material/core';

import {
ApexAxisChartSeries,
ApexChart,
ChartComponent,
ApexDataLabels,
ApexYAxis,
ApexLegend,
ApexXAxis,
ApexTooltip,
ApexTheme,
ApexGrid,
ApexPlotOptions,
ApexFill,
NgApexchartsModule,
} from 'ng-apexcharts';
import { MaterialModule } from 'src/app/material.module';

	export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    xaxis: ApexXAxis;
    yaxis: ApexYAxis;
    stroke: any;
    theme: ApexTheme;
    tooltip: ApexTooltip;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    colors: string[];
    markers: any;
    grid: ApexGrid;
    plotOptions: ApexPlotOptions;
    fill: ApexFill;
    labels: string[];
  };

@Component({
  selector: 'app-sales-overview',
imports: [
  NgApexchartsModule, 
  MaterialModule,
  MatDatepickerModule,
  MatButtonModule, 
  MatIconModule,
  MatFormFieldModule, 
  MatInputModule],
  templateUrl: './sales-overview.component.html',
  	providers: [provideNativeDateAdapter()],
})
export class AppSalesOverviewComponent {

@ViewChild('chart') chart: ChartComponent = Object.create(null);
public areaChartOptions: Partial<ChartOptions> | any;
constructor() {
//Area chart.
this.areaChartOptions = {
series: [
{
name: 'Site A',
data: [0, 300, 100, 200, 1200, 100, 500, 100],
},
{
name: 'Site B',
data: [0, 500, 600, 800, 2800, 900, 800, 2200],
},
],
chart: {
fontFamily: 'inherit',
foreColor: '#a1aab2',
height: 300,
type: 'area',
toolbar: {
show: false,
},
},
dataLabels: {
enabled: false,
},
markers: {
size: 3,
},
stroke: {
curve: 'smooth',
width: '2',
},
colors: ['#398bf7', '#06d79c'],
legend: {
show: false,
},
grid: {
show: true,
strokeDashArray: 0,
borderColor: 'rgba(0,0,0,0.1)',
xaxis: {
lines: {
show: true,
},
},
yaxis: {
lines: {
show: true,
},
},
},
xaxis: {
type: 'category',
categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
},
tooltip: {
theme: 'dark',
},
};
}
}
