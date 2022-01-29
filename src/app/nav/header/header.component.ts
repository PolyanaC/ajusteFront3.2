import { InteractionService } from './../../services/interaction.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { CategoriaService } from 'src/app/services/categoria.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() public sidenavToggle = new EventEmitter();

  categorias: Categoria[]
  categoriaSelecionada:any = ''
  messageFromCompA="Hello Angular, I am CompA";

  constructor(private categoriaService: CategoriaService, private router: Router, private headerService: HeaderService) { }

  ngOnInit(): void {
    this.categoriaService.read().subscribe(categorias => {
      this.categorias = categorias
    }),
    this.sendInfoToCompB()
    }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

  sendInfoToCompB(){
    this.headerService.communicateMessage(this.messageFromCompA)
  }
  

}