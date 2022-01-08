import { Component, OnInit } from "@angular/core";
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {ToastrService} from 'ngx-toastr';
import {repeat} from 'rxjs';

@Component({
  selector: "app-products",
  templateUrl: "products.component.html"
})
export class ProductsComponent implements OnInit {

  products: Product[];
  notifications: NotificationsComponent;

  constructor(private productService: ProductsService, private toastr: ToastrService) {}

  ngOnInit() {
    this.productService.readAll().subscribe(data => {
      this.products = data;
    })
  }

  sort(typeOfSort: string) {
    if (typeOfSort == 'name') {
      this.products = this.products.sort((product1, product2) => this.sortByName(product1.name.toLowerCase(), product2.name.toLowerCase()));
    }
  }

  sortByName(product1: string, product2: string) {
    if (product1 >= product2) {
      return 1;
    } else {
      return -1;
    }
  }

  handleSubtract = (product: Product, message: string) => {
    product.quantity--;
    if (product.quantity != 0) {
      this.productService.update(product.id, product).subscribe(response => {
        this.showNotification('success', message);

        let productIndex = this.products.findIndex(productSearched => productSearched.id == response.id);
        this.products[productIndex] = response;

        //this.ngOnInit();
      }, error => {
        this.showNotification('error', error);
      });
    } else {
      this.handleDelete(product, message);
    }
  }

  handleAdd = (product: Product, message: string) => {
    product.quantity++;
    this.productService.update(product.id, product).subscribe(response => {
      this.showNotification('success', message);

      let productIndex = this.products.findIndex(productSearched => productSearched.id == response.id);
      this.products[productIndex] = response;

      //this.ngOnInit();
    }, error => {
      this.showNotification('error', error);
    })
  }

  handleDelete = (product: Product, message: string) => {
    this.productService.delete(product.id).subscribe(response => {
      this.products = this.products.filter(object => object != response);
      this.showNotification('success', message);
      this.ngOnInit();
    },
    error => {
      this.showNotification('error', error);
        });
  }

  showNotification = (type, message) => {

    const from = 'top';
    const align = 'right';

    switch (type) {
      case "info":
        this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-info alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case "success":
        this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-success alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case "warning":
        this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-warning alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case "error":
        this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
          disableTimeOut: true,
          enableHtml: true,
          closeButton: true,
          toastClass: "alert alert-danger alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      case "show":
        this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span>' + message, '', {
          disableTimeOut: true,
          closeButton: true,
          enableHtml: true,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + from + '-' +  align
        });
        break;
      default:
        break;
    }
  }
}
