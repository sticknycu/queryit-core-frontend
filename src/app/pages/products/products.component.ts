import { Component, OnInit } from "@angular/core";
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {ToastrService} from 'ngx-toastr';

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

  handleSubtract = (product: Product, message: string) => {
    product.quantity--;
    this.productService.update(product.id, product).subscribe(response => {
      this.showNotification('success', message);
      const index = this.products.findIndex(item => item.id = response.id);
      this.products[index] = response;
    }, error => {
      this.showNotification('error', error);
    })
  }

  handleAdd = (product: Product, message: string) => {
    product.quantity++;
    this.productService.update(product.id, product).subscribe(response => {
      this.showNotification('success', message);
      const index = this.products.findIndex(item => item.id = response.id);
      this.products[index] = response;
    }, error => {
      this.showNotification('error', error);
    })
  }

  handleDelete = (product: Product, message: string) => {
    this.productService.delete(product.id).subscribe(response => {
      this.products.filter(object => object != response);
      this.showNotification('success', message);
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
