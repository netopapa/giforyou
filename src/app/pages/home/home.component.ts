import { Component, OnInit } from '@angular/core';
import { GifApiService } from '../../gif-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class HomeComponent implements OnInit {

  constructor(private gifService: GifApiService) { }

  //iniciando objetos de Gifs pré definidos
  public happyGifs: object = {};
  public melancholyGifs: object = {};
  public angryGifs: object = {};

  public pesquisa: string;

  ngOnInit() {
    //busca por 'happy'
    this.gifService.lookForMe('happy', 6)
    .subscribe(res => {
      this.happyGifs = res['data'];
    });

    //busca por 'angry'
    this.gifService.lookForMe('angry', 6)
    .subscribe(res => {
      this.angryGifs = res['data'];
    });

    //busca por 'melancholy'
    this.gifService.lookForMe('melancholy', 6)
    .subscribe(res => {
      this.melancholyGifs = res['data'];
    });
  }

}
