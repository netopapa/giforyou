import { Component, OnInit, HostListener, ViewChild, ElementRef, Renderer } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GifApiService } from '../../gif-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css', '../../../font-awesome-4.7.0/css/font-awesome.min.css']
})
export class SearchComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  
  @HostListener('window:scroll', [this.gifs]) onFullScroll(){
    let contentHeight: number = this.content.nativeElement.offsetHeight;
    let scroll = contentHeight - this.viewHeight;
    if(window.scrollY >= scroll){
      this.more();
      this.load = true;
    }
  }
  
  
  constructor(
    private route: ActivatedRoute,
    private gifService: GifApiService,
    private _renderer: Renderer
  ) { }
  
  public gifs: object[] = [];
  public pesquisaAtual: string = '';
  public pesquisa: string = '';
  
  public qntd: number = 12;
  
  public viewHeight: number;

  public load: boolean = false;
  
  ngOnInit() {
    this.viewHeight = (window.screen.height);
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
      this.gifs = this.gifs.concat(res['data']);
      setTimeout(()=>{this.load = false;}, 1500);
    });
  }


}
