import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-usuarios-modificar',
  templateUrl: './usuarios-modificar.component.html',
  styleUrls: ['./usuarios-modificar.component.css']
})
export class UsuariosModificarComponent implements OnInit {

  usuario: Usuario


  constructor(
    private usuarioService: UsuarioService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: ToastrService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')
    this.usuarioService.readById(id).subscribe(usuario => {
      this.usuario = usuario
    })
  }

  modificarUsuario(): void {
    this.usuarioService.update(this.usuario).subscribe(() => {
      this.toast.success('Usuario atualizado com sucesso!')
    })
    this.router.navigate(['/usuario/{{usuario.id}}']);
  }


  cancelar(): void {
    this.router.navigate(['/usuario/{{usuario.id}}']);
  }

}
