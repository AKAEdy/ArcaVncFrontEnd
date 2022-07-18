import { Component, OnInit } from '@angular/core';
import { UsuariosService } from 'app/api/usuarios.service';
import { Usuario } from 'app/model/usuario';
import { Rol } from 'app/models/rol';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {

  usuarios:Usuario[]=[]
  roles:Rol[]=[]
  constructor(private usuarioService:UsuariosService) { }

  ngOnInit(): void {
    this.getAllUsuario()
  }

  getAllUsuario(){
   this.usuarioService.retireveUsersUsingGET().subscribe(data =>{
    this.usuarios = data.slice().reverse()

   })
  }

  eliminarUsuario(id: number){
    Swal.fire({
      title: '¿Esta seguro que decea eliminar?',
      text: "No podra revertit los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#FE3838',
      cancelButtonColor: '#878787',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'Registro eliminado exitosamente.',
          'success'
        )
        this.getAllUsuario()
      }
    })
    this.usuarioService.deleteUsingDELETE7(id).subscribe(data =>{
    })
    

  }
}
