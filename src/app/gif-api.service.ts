import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Subscription} from 'rxjs/Rx';

@Injectable()
export class GifApiService {

  private key: string = 'Wuqc0hQCjUYZoNQAJfM7ceVZOQS0D140';
  public url: string = 'https://api.giphy.com/v1/gifs/search?';

  constructor(private http: Http) { }

  lookForMe(query:string, limite:number, offset = 0){
    let fullUrl: string = `${this.url}q=${query}&api_key=${this.key}&limit=${limite}&offset=${offset}`; 
    return this.http.get(fullUrl).map(
      (response) => {return response.json()}
  );
  }
}
