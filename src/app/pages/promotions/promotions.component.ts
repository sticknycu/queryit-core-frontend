import { Component, OnInit } from "@angular/core";
import {Category} from '../../model/category';
import {NotificationsComponent} from '../notifications/notifications.component';
import {CategoryService} from '../../services/category.service';
import {ToastrService} from 'ngx-toastr';
import {PromotionsService} from '../../services/promotions.service';
import {Promotion} from '../../model/promotion';
import {kaLocale} from 'ngx-bootstrap/chronos';
import {DatePipe} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: "app-promotions",
  templateUrl: "promotions.component.html"
})
export class PromotionsComponent implements OnInit {
  promotions: Promotion[];
  categories: Category[];
  notifications: NotificationsComponent;
  categoryId: number = 0;

  constructor(private promotionsService: PromotionsService,
              private categoryService: CategoryService,
              private toastr: ToastrService,
              private translateService: TranslateService) {}

  ngOnInit() {
    this.promotionsService.readAll().subscribe(data => {
      this.promotions = data;
    })
    this.categoryService.readAll().subscribe(data => {
      this.categories = data;
    });
  }

  // 14 e categoryId maxim
  increaseCategoryId = () => this.categoryId == 14 ? this.categoryId = 14 : this.categoryId++;

  decreaseCategoryId = () => this.categoryId--;

  sort(typeOfSort: string) {
    if (typeOfSort == 'name') {
      this.promotions = this.promotions.sort((promotion1, promotion2) => this.sortByName(promotion1.name.toLowerCase(), promotion2.name.toLowerCase()));
    } else if (typeOfSort == 'category') {
      this.promotions = this.promotions.sort((promotion1, promotion2) => this.sortById(promotion1.id, promotion2.id));
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

  handleSubtract = (promotion: Promotion, message: string) => {
    promotion.quantityNeeded--;
    if (promotion.quantityNeeded != 0) {
      this.promotionsService.update(promotion.id, promotion).subscribe(response => {
        this.showNotification('success', message);

        let promotionIndex = this.promotions.findIndex(promotionSearched => promotionSearched.id == response.id);
        this.promotions[promotionIndex] = response;

        //this.ngOnInit();
      }, error => {
        this.showNotification('error', error);
      });
    } else {
      this.handleDelete(promotion, message);
    }
  }

  handleAdd = (promotion: Promotion, message: string) => {
    promotion.quantityNeeded++;
    this.promotionsService.update(promotion.id, promotion).subscribe(response => {
      this.showNotification('success', message);

      let promotionIndex = this.promotions.findIndex(promotionSearched => promotionSearched.id == response.id);
      this.promotions[promotionIndex] = response;

      //this.ngOnInit();
    }, error => {
      this.showNotification('error', error);
    })
  }

  handleDelete = (promotion: Promotion, message: string) => {
    this.promotionsService.delete(promotion.id).subscribe(response => {
          this.promotions = this.promotions.filter(object => object != response);
          this.showNotification('success', message);
          this.ngOnInit();
        },
        error => {
          this.showNotification('error', error);
        });
  }

  expireDate(longDate: number) {
    const datePipe: DatePipe = new DatePipe(this.translateService.currentLang);
    return datePipe.transform(longDate, 'dd-MMM-YYYY HH:mm:ss')
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
