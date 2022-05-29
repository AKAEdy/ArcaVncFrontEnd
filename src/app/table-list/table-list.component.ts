import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { AnimalesService } from 'app/api/animales.service';
import { Animal } from 'app/model/animal';
import { environment } from 'environments/environment';
const basePath = environment.basePath + "/animales";

import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  public totalRegistros = 0;
  public paginaActual = 0;
  public totalPorPagina = 10;
  public pageSizeOptions: number[] = [10, 20, 50, 100];
  //MATPAGINATOR
  @ViewChild(MatPaginator, { static: true }) paginador: MatPaginator;
  //VARIABLE DE Docente
  public animales: Animal[] = [];
  //VARIABLE DE LOADING
  public cargando: boolean = true;
  //VARIABLE PARA BUSCAR
  public busqueda: string = "";
  constructor(private animalesService: AnimalesService) { }

  ngOnInit() {
    
    // this.getAnimalesPage(
    //   this.paginaActual.toString(),
    //   this.totalPorPagina.toString(),
    //   this.busqueda
    // );
  }

  public paginar(event: PageEvent): void {
    this.paginaActual = event.pageIndex;
    this.totalPorPagina = event.pageSize;
    this.getAnimalesPage(
      this.paginaActual.toString(),
      this.totalPorPagina.toString(),
      this.busqueda
    );
  }

  private getAnimalesPage(page: string, size: string, busqueda: string) {
    this.cargando = true;


    this.animalesService.getAnimalesPage(page, size, busqueda).subscribe((p) => {
      this.animales = p.content as Animal[];
      this.totalRegistros = p.totalElements as number;
      this.paginador._intl.itemsPerPageLabel = "Registros por página:";
      this.paginador._intl.nextPageLabel = "Siguiente";
      this.paginador._intl.previousPageLabel = "Previa";
      this.paginador._intl.firstPageLabel = "Primera Página";
      this.paginador._intl.lastPageLabel = "Última Página";
      this.cargando = false;
    });
  }
  buscar(txtBusqueda: string) {
    if (txtBusqueda.length > 0) {
      this.getAnimalesPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        txtBusqueda
      );
    }
  }
  cargarAnimalDefault(txtBusqueda: string) {
    if (txtBusqueda.length === 0) {
      return this.getAnimalesPage(
        this.paginaActual.toString(),
        this.totalPorPagina.toString(),
        this.busqueda
      );
    }
  }
  deleteUsingDELETE(animal: Animal) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "¿Estas  seguro?",
        text: `¿Seguro que quieres eliminar al Docente ${animal.nombre} ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si, eliminar!",
        cancelButtonText: "No, cancelar!",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.value) {

this.animalesService.deleteUsingDELETE(animal.id).subscribe((resp)=>{
          
          //this.animalesService.eliminar(animal.id).subscribe((resp) => {
            this.getAnimalesPage(
              this.paginaActual.toString(),
              this.totalPorPagina.toString(),
              this.busqueda
            );
            swalWithBootstrapButtons.fire(
              "Eliminada!",
              `Animal ${animal.nombre} eliminado (a) correctamente!`,
              "success"
            );
          });
        }
      });
  }

}







