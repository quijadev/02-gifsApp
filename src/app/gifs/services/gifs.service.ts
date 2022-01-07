import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'xB9eHiQAJ1sTSruUIFlo3GxgmtbZFFiQ';
  private _historial: string[] = [];

  //TODO cambiar any por un tipo
  private _resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  get resultados() {
    return [...this._resultados];
  }

  constructor( private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
  }

  buscar( query: string) {

    query = query.trim().toLocaleLowerCase();

    if( !this._historial.includes( query)) {
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }     

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=xB9eHiQAJ1sTSruUIFlo3GxgmtbZFFiQ&q=${ query }&limit=10`)
      .subscribe( (data ) => {
        console.log(data.data);
        this._resultados = data.data;
      });

    console.log(this._historial);
  }
}
