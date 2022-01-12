import { Component, OnInit } from "@angular/core";
import {Product} from '../../model/product';
import {Category} from '../../model/category';
import {NotificationsComponent} from '../notifications/notifications.component';
import {ProductsService} from '../../services/products.service';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: "app-tables",
  templateUrl: "tables.component.html"
})
export class TablesComponent implements OnInit {
  products: Product[];
  categories: Category[];
  notifications: NotificationsComponent;
  categoryId: number = 0;

  constructor(private productService: ProductsService,
              private categoryService: CategoryService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.productService.readAll().subscribe(data => {
      this.products = data;
    });
    this.categoryService.readAll().subscribe(data => {
      this.categories = data;
    });
  }

  // 14 e categoryId maxim
  increaseCategoryId = () => this.categoryId == 14 ? this.categoryId = 14 : this.categoryId++;

  decreaseCategoryId = () => this.categoryId--;

  sort(typeOfSort: string) {
    if (typeOfSort == 'name') {
      this.products = this.products.sort((product1, product2) => this.sortByName(product1.name.toLowerCase(), product2.name.toLowerCase()));
    } else if (typeOfSort == 'category') {
      this.products = this.products.sort((product1, product2) => this.sortById(product1.category.id, product2.category.id));
    }
  }

  sortById(id1: number, id2: number) {
    if (id1 >= id2) {
      return 1;
    } else {
      return -1;
    }
  }

  sortByName(name1: string, name2: string) {
    if (name1 >= name2) {
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

  getProductsByCategoryId = (categoryId: number) => {
    this.productService.getProductsByCategoryId(categoryId).subscribe(response => {
      this.products = response;
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
