import { Component, OnInit } from '@angular/core';
import { Artigo } from 'src/app/models/artigo.model';
import { ArtigoService } from 'src/app/services/artigo.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-artigo',
  templateUrl: './artigo.component.html',
  styleUrls: ['./artigo.component.css']
})
export class ArtigoComponent implements OnInit {

  artigo: Artigo

  constructor(
    private artigosService: ArtigoService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit( ): void {
  const id = +this.route.snapshot.paramMap.get('id')
  this.artigosService.readById(id).subscribe(artigo =>{
    this.artigo = artigo
  }   )

}
  navigateToArtigos(): void {
    this.router.navigate(['/artigos'])
  }
  
}