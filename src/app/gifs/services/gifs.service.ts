import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'xB9eHiQAJ1sTSruUIFlo3GxgmtbZFFiQ';
  private _servicioUrl: string = 'https://api.giphy.com/v1/gifs';
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
    this._resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscar( query: string) {

    query = query.trim().toLocaleLowerCase();

    const params = new HttpParams().set('api_key',this._apiKey).set('limit',10).set('q',query);


    if( !this._historial.includes( query)) {
      this._historial.unshift( query);
      this._historial = this._historial.splice(0,10);

      localStorage.setItem('historial', JSON.stringify(this._historial));
    }     

    this.http.get<SearchGifsResponse>(`${ this._servicioUrl }/search`, { params })
      .subscribe( (data ) => {
        this._resultados = data.data;
        localStorage.setItem('resultados', JSON.stringify(this._resultados));
      });

  }
}
