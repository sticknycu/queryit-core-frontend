import { Component, OnInit } from "@angular/core";
import {Product} from '../../model/product';
import {ProductsService} from '../../services/products.service';
import {NotificationsComponent} from '../notifications/notifications.component';
import {ToastrService} from 'ngx-toastr';
import {Category} from '../../model/category';
import {CategoryService} from '../../services/category.service';
import {Promotion} from '../../model/promotion';
import {PromotionsService} from '../../services/promotions.service';
import {MiniMarket} from '../../model/mini-market';
import {Manufacturer} from '../../model/manufacturer';
import {MinimarketService} from '../../services/minimarket.service';
import {ManufacturerService} from '../../services/manufacturer.service';

@Component({
  selector: "app-products",
  templateUrl: "products.component.html"
})
export class ProductsComponent implements OnInit {

  products: Product[];
  categories: Category[];
  promotions: Promotion[];
  minimarkets: MiniMarket[];
  manufacturers: Manufacturer[];
  notifications: NotificationsComponent;
  categoryId: number = 1;
  show: boolean = false;
  indexProductAdd: number = 0;
  indexPromotionAdd: number = 0;
  indexCategoryAdd: number = 0;
  indexMinimarketAdd: number = 0;
  indexManufacturerAdd: number = 0;

  constructor(private productService: ProductsService,
              private categoryService: CategoryService,
              private promotionsService: PromotionsService,
              private minimarketService: MinimarketService,
              private manufacturerService: ManufacturerService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.productService.readAll().subscribe(data => {
      this.products = data;
    });
    this.categoryService.readAll().subscribe(data => {
      this.categories = data;
    });
    this.promotionsService.readAll().subscribe(data => {
      this.promotions = data;
    });
    this.minimarketService.readAll().subscribe(data => {
      this.minimarkets = data;
    });
    this.manufacturerService.readAll().subscribe(data => {
      this.manufacturers = data;
    })

    this.indexProductAdd = this.products.length + 1;
    this.indexPromotionAdd = this.promotions.length + 1;
    this.indexCategoryAdd = this.categories.length + 1;
    this.indexMinimarketAdd = this.minimarkets.length + 1;
    this.indexManufacturerAdd = this.manufacturers.length + 1;
  }

  showNewProduct() {
    this.show = !this.show;
  }

  addProduct(name: string, price: number, quantity: number, iconUrl: string, category: string, promotion: number,
             minimarket: string, manufacturer: string) {
      let promotionAvailable = null;
      if (promotion != 0) {
        promotionAvailable = new Promotion(this.indexPromotionAdd, name, "La " + promotion + " primesti unul gratis",
            new Date().getDate(), promotion);
        this.promotionsService.create(promotionAvailable);
      }

      let categoryId = this.categories.filter(
          categoryName => categoryName.name == category)[0].id;
      if (categoryId == null) {
        let newCategory = new Category(this.indexCategoryAdd, category);
        this.categoryService.create(newCategory);
      }

      let minimarketId = this.minimarkets.filter(
          minimarketName => minimarketName.name == minimarket)[0].id;
      if (minimarketId == null) {
        let newMiniMarket = new MiniMarket(this.indexMinimarketAdd, minimarket);
        this.minimarketService.create(newMiniMarket);
      }

      let manufacturerId = this.manufacturers.filter(
          manufacturerName => manufacturerName.name == manufacturer)[0].id;
      if (manufacturerId == null) {
        let newManufacturer = new Manufacturer(this.indexManufacturerAdd, manufacturer);
        this.manufacturerService.create(newManufacturer);
      }

      let product = new Product(this.indexProductAdd,
          name, price, quantity, iconUrl, new Category(categoryId, category),
          null, new MiniMarket(minimarketId, minimarket), new Manufacturer(manufacturerId, manufacturer));
      this.productService.create(product);

      this.show = false;
  }

  increaseCategoryId = () => this.categoryId++;

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
  formName: any;
  formQuantity: any;
  formPrice: any;
  formIcon: any;
  formCategory: any;
  formPromotion: any;
  formMinimarket: any;
  formManufacturer: any;
}
