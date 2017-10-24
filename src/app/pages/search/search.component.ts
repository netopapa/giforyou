import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GifApiService } from '../../gif-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class SearchComponent implements OnInit {

  constructor(private route: ActivatedRoute, private gifService: GifApiService) { }

  public gifs: object[] = [];
  public pesquisaAtual: string = '';
  public pesquisa: string = '';

  public qntd: number = 12;


  ngOnInit() {
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.pesquisaAtual = queryParams['p'];
        this.gifService.lookForMe(queryParams['p'], 12)
        .subscribe(res => {
          this.gifs = res['data'];
        });
      }
    );
  }

  pesquisar(){
    this.pesquisaAtual = `${this.pesquisaAtual}+${this.pesquisa}`;
    this.gifService.lookForMe(this.pesquisaAtual, 12)
    .subscribe(res => {
      this.gifs = res['data'];
      this.pesquisa = '';
    });
  }

  more(){
    this.qntd += 12;
    this.gifService.lookForMe(this.pesquisaAtual, 12, this.qntd)
    .subscribe(res => {
      for(let i:number = 0; i< 12; i++){
        this.gifs.push(res['data'][i]);
      }
    });
  }


}
