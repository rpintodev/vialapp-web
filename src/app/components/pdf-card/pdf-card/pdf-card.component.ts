import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { TablerIconsModule } from 'angular-tabler-icons';


@Component({
  selector: 'app-pdf-card',
  imports: [MatCardModule,PdfViewerModule,CommonModule, TablerIconsModule],
  templateUrl: './pdf-card.component.html',
})
export class PdfCardComponent {
  @Input() src: string | undefined;

  zoom = 1.0;

zoomIn() {
  this.zoom += 0.2;
}

zoomOut() {
  this.zoom -= 0.2;
}

download() {
  if (!this.src) return;
  const link = document.createElement('a');
  link.href = this.src;
  link.download = 'reporte.pdf';
  link.click();
}

print() {
  const win = window.open(this.src);
  win?.print();
}
}
