import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GifApiService } from '../../gif-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class SearchComponent implements OnInit {
  //section search page
  @ViewChild('content') content: ElementRef;
  //captura scroll
  @HostListener('window:scroll', []) onFullScroll(){
    //pega tamanho atual da section
    let contentHeight: number = this.content.nativeElement.offsetHeight;
    //pega altura atual do scroll
    let scroll = contentHeight - this.viewHeight;
    //se barra de rolagem perto do fim da página
    if(window.scrollY >= scroll){
      //faz nova requisição
      this.more();
    }
  }
  
  
  constructor(
    private route: ActivatedRoute,
    private gifService: GifApiService,
    private _renderer: Renderer
  ) { }
  
  //array de objetos de gifs
  public gifs: object[] = [];
  //pesquisa atual
  public pesquisaAtual: string = '';
  //input do form de pesquisa
  public pesquisa: string = '';
  //quantidade de gifs
  public qntd: number = 12;
  //altura da view
  public viewHeight: number;
  //ativador do loading
  public load: boolean = false;
  //vazio?
  public empty: boolean = false;
  
  ngOnInit() {
    //pega altura da página
    this.viewHeight = (window.screen.height);
    //traz pesquisa da home page
    this.route.queryParams.subscribe(
      (queryParams: any) => {
        this.pesquisaAtual = queryParams['p'];
        //faz requisição
        this.gifService.lookForMe(queryParams['p'], 12)
        .subscribe(res => {
          this.gifs = res['data'];
          if(this.gifs.length < 1){
            this.empty = true;
          }else{
            this.empty = false;
          }
        });
      }
    );
  }

  //pesquisa por novos gifs a partir de uma string
  pesquisar(){
    this.pesquisaAtual = `${this.pesquisaAtual}+${this.pesquisa}`;
    this.gifService.lookForMe(this.pesquisaAtual, 12)
    .subscribe(res => {
      this.gifs = res['data'];
      this.pesquisa = '';
      if(this.gifs.length < 1){
        this.empty = true;
      }else{
        this.empty = false;
      }
    });
  }

  //pesquisa mais gifs da pesquisa atual
  more(){
    if(!this.empty){
      //ativa loading
      this.load = true;
      //offset
      this.qntd += 12;
      //requisição
      this.gifService.lookForMe(this.pesquisaAtual, 12, this.qntd)
      .subscribe(res => {
        this.gifs = this.gifs.concat(res['data']);
        setTimeout(()=>{this.load = false;}, 1500);
      });
    }
  }

}
