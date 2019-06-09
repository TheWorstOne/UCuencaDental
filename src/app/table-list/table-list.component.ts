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

  displayedColumns = ['Id', 'Nombre', 'Descripcion', 'Stock'];
  dataSource: MatTableDataSource<Producto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) {

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.getProducts()
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

  getProducts() {
    this.rest.getProducts().subscribe((data: {}) => {
      this.dataSource.data = data['data']
    });
  }

}

export interface Producto {
  Id: string;
  Nombre: string;
  Descripcion: string;
  PrecioUnitario: number;
  Stock: number;
  Activo: boolean;
  createdAt: string;
  updatedAt: string;
}