import { Component, OnInit,ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

/**
 * @title Data table with sorting, pagination, and filtering.
 */

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  panelOpenState: boolean = false;

  inventarios = [
    'Insumos',
    'Instrumentos',
    'Equipos',
  ];

  inventarioItem: string = this.inventarios[0];

  productColumns = {
    'Equipos': ['id', 'nombre','marca', 'descripcion', 'fecha','observacion','stock', 'estado'],
    'Insumos': ['id', 'nombre','descripcion', 'fecha','caducidad', 'precio','stock'],
    'Instrumentos': ['id', 'nombre', 'descripcion', 'fecha','observacion','stock', 'estado']
  }

  displayedColumns = this.productColumns[this.inventarioItem];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getEquipos()
  }

  ngOnInit() {
    
  }    

  /**
   * Set the paginator and sort after the view init since this component will
   * be able to query its view for the initialized paginator and sort.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getEquipos() {
    this.rest.getEquipos().subscribe((data: {}) => {
      this.dataSource.data = data['data']
    });
  }

}


/*
export interface Equipos {
  id: string;
  nombre: string;
  descripcion: string;
  precioUnitario: number;
  stock: number;
  activo: boolean;
  createdAt: string;
  updatedAt: string;
}
*/