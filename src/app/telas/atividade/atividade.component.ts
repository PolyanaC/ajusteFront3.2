import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-atividade',
  templateUrl: './atividade.component.html',
  styleUrls: ['./atividade.component.css']
})
export class AtividadeComponent implements OnInit {

  atividade: Atividade

  constructor(
    private atividadesService: AtividadeService, 
    private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.atividadesService.readById(id).subscribe(atividade => {
      this.atividade = atividade
    });
  }

  navigateToAtividades(): void {
    this.router.navigate(['/atividades'])
  }
}

