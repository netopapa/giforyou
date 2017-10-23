import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Rx';

@Injectable()
export class GifApiService {

  public key: string = 'Wuqc0hQCjUYZoNQAJfM7ceVZOQS0D140';
  public url: string = 'http://api.giphy.com/v1/gifs/search?';

  //http://api.giphy.com/v1/gifs/search?q=ryan+gosling&api_key=Wuqc0hQCjUYZoNQAJfM7ceVZOQS0D140&limit=5

  constructor(private http: Http) { }

  lookForMe(query:string, limite:number, offset = 0){
    let fullUrl: string = `${this.url}q=${query}&api_key=${this.key}&limit=${limite}&offset=${offset}`; 
    return this.http.get(fullUrl).map(
      (response) => {return response.json()}
  );
  }
}
