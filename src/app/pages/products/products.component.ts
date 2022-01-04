import { Component, OnInit } from "@angular/core";
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';

@Component({
  selector: "app-products",
  templateUrl: "products.component.html"
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductsService) {}

  ngOnInit() {
    this.productService.findAll().subscribe(data => {
      this.products = data;
    })
  }
}
