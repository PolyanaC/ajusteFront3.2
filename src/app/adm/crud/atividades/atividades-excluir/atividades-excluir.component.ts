import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/models/atividade.model';
import { AtividadeService } from 'src/app/services/atividade.service';
@Component({
  selector: 'app-atividades-excluir',
  templateUrl: './atividades-excluir.component.html',
  styleUrls: ['./atividades-excluir.component.css']
})
export class AtividadesExcluirComponent implements OnInit {

  atividade: Atividade

  constructor(
    private atividadeService: AtividadeService, 
    private router: Router, 
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.atividadeService.readById(id).subscribe(atividade => {
      this.atividade = atividade
    })
  }

  deletarAtividade() {
    this.atividadeService.delete(this.atividade.id).subscribe(() => {
      this.atividadeService.showMessage('Atividade excuída com sucesso')
      this.router.navigate(['adm-atividades']);
    })
  }

  cancelar(): void {
    this.router.navigate(['adm-atividades']);
  }

}