import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
@Component({
  selector: 'app-usuarios-excluir',
  templateUrl: './usuarios-excluir.component.html',
  styleUrls: ['./usuarios-excluir.component.css']
})
export class UsuariosExcluirComponent implements OnInit {

  usuario: Usuario

  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService
    ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario
    })
  }

  excluirUsuario() {
    this.usuarioService.delete(this.usuario.id).subscribe(() => {
      this.toast.success('Usuario excuído com sucesso')
      this.router.navigate(['/adm-usuarios'])
    })
  }

  cancelar(): void {
    this.router.navigate(['/adm-usuarios'])
  }

}
