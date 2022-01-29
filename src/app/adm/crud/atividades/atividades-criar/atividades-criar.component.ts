import { Categoria } from 'src/app/models/categoria.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/atividade.model';
import { Router } from '@angular/router';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Serie } from 'src/app/models/serie.model';
import { SerieService } from 'src/app/services/serie.service';
import { Observable, Subscriber } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-atividades-criar',
  templateUrl: './atividades-criar.component.html',
  styleUrls: ['./atividades-criar.component.css']
})
export class AtividadesCriarComponent implements OnInit {

  materiaSelecionada : Categoria

  serieSelecionada: Serie

  categorias: Categoria[]
  
  series: Serie[]

  dataPub : string = new Date().toLocaleString()
 atividade: Atividade = {
  id: 0,
  titulo:'',
  serie: null,
  materia: null,
  imagem: '' ,
  descricao: '',
  autor:'',
  data: this.dataPub
 }
 
 base64: string = "Base64...";
  fileSelected?: Blob;
  imageUrl?: string;
  imagem: Observable<any>

   constructor(private atividadeService: AtividadeService, 
     private router: Router,
     private categoriaService: CategoriaService,
     private serieService: SerieService,
     private sant: DomSanitizer
     ) { }
  
   ngOnInit(): void {
    this.categoriaService.read().subscribe(categorias => {
      this.categorias = categorias
    })
    this.serieService.read().subscribe(series => {
      this.series = series
    })
   }


   criarAtividade(): void{
     this.atividade.serie = this.serieSelecionada
     this.atividade.materia = this.materiaSelecionada
     this.atividade.imagem = this.imagem
     this.atividadeService.create(this.atividade).subscribe(() => {
       this.atividadeService.showMessage('Postagem criada!')
       this.router.navigate(['/adm-atividades'])
     })
     }
   
   cancelar(): void{
     this.router.navigate(['/adm/atividades'])
   }
   
   onChange($event){
    const file=($event.target as HTMLInputElement).files[0];
    this.convertToBase64(file);
  }

  convertToBase64(file:File){
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
      this.atividade.imagem = this.base64
    });
    observable.subscribe(
      (d) => {
        this.imagem = d;
            },
            (error) => {
              alert(error);
            }
    )
  }

  readFile(file: File, subscriber: Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    fileReader.onload=()=>{
      subscriber.next(fileReader.result);
      subscriber.complete();
    };
    
    fileReader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
    
    }
   
 }
 