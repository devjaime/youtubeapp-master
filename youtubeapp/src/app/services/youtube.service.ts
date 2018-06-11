import { Injectable } from '@angular/core';

// http se importa para el get y URLSearchParams para setearle parametros a la url que se le pasa al http
import { Http, URLSearchParams } from '@angular/http';

// Importacion para usar la funcion map()
import 'rxjs/Rx';

@Injectable()
export class YoutubeService {

  youtubeUrl:string = "https://www.googleapis.com/youtube/v3/playlistItems";
  apiKey: string = "AIzaSyCTJxY5cJbVIMoUmhY6oY2TfNXiTq38Vr0";

  private nextPageTocken:string = "";

  constructor( public http:Http ) { }

  getVideos(){

    // Objeto al que se le setean los parametros
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '10');
    params.set('playlistId', 'UUQsrs_h91Q-baLx-n_rcdNg');
    params.set('key', this.apiKey);

    if( this.nextPageTocken != "" ){
      params.set('pageToken', this.nextPageTocken);
    }

    // llamada al http pasandole la url y los parametros
    return this.http.get(this.youtubeUrl, {search: params})
      .map( res => {
      console.log(res.json());
      this.nextPageTocken = res.json().nextPageToken;

      // se crea un arreglo con todos los snippet de la respuesta a la llamada http, cada snippet tiene un video
      let videos:any = [];

      for(let video of res.json().items){
        let snippet = video.snippet;
        videos.push(snippet);
      }

      return videos;
    })
  }

}
