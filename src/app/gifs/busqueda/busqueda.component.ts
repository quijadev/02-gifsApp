import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>;

  constructor (private gifsService: GifsService) { }

  buscar() {
    
    const term = this.txtBuscar.nativeElement.value;

    if (term.trim().length === 0) {
      return;
    }

    this.gifsService.buscar(term);

    this.txtBuscar.nativeElement.value = '';
  }
}
