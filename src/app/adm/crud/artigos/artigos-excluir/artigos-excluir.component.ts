import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artigo } from 'src/app/models/artigo.model';
import { ArtigoService } from 'src/app/services/artigo.service'; 

@Component({
  selector: 'app-artigos-excluir',
  templateUrl: './artigos-excluir.component.html',
  styleUrls: ['./artigos-excluir.component.css']
})
export class ArtigosExcluirComponent implements OnInit {


  artigo: Artigo

  constructor(
    private artigoService: ArtigoService, 
    private router: Router , 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.artigoService.readById(id).subscribe(artigo => {
      this.artigo = artigo
    })
  }

  excluirArtigo() {
    this.artigoService.delete(this.artigo.id).subscribe(() => {
      this.artigoService.showMessage('Artigo excuído com sucesso')
      this.router.navigate(['/adm-artigos'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/adm-artigos'])
  }

}
