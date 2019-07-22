import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  personaEntrega: string = "";

  products = [{
    "categoria": 0,
    "id": 0,
    "nombre": "",
    "descripcion": "",
    "precio_unitario": 0,
    "marca": "",
    "observacion": "",
    "estado": "Buen estado",
    "stock": 0
  }];

  constructor(public rest:RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  nuevoProducto() {
    this.products.push({
      "categoria": 0,
      "id": 0,
      "nombre": "",
      "descripcion": "",
      "precio_unitario": 0,
      "marca": "",
      "observacion": "",
      "estado": "Buen estado",
      "stock": 0
    });
  }

  quitarProducto(product) {
    const index = this.products.indexOf(product, 0);
    if (this.products.length>1){
      if (index > -1) {
        this.products.splice(index, 1);
      }
    }
  }

  enviarProductos() {
    console.log(this.products);
    this.rest.setProducts({"data":this.products}).subscribe((result) => {
      console.log(result);
    }, (err) => {
      console.log(err);
    });
  }

}
