import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { PromotionsComponent } from "../../pages/promotions/promotions.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {MatButtonModule} from '@angular/material/button';
import {CategoryComponent} from '../../pages/category/category.component';
import {DepositComponent} from '../../pages/deposits/deposit.component';
import {ManufacturerComponent} from '../../pages/manufacturers/manufacturer.component';
import {MinimarketComponent} from '../../pages/minimarkets/minimarket.component';
import {TruckComponent} from '../../pages/trucks/truck.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(AdminLayoutRoutes),
        FormsModule,
        HttpClientModule,
        NgbModule,
        BsDropdownModule,
        MatButtonModule,
    ],
  declarations: [
    DashboardComponent,
    PromotionsComponent,
    ProductsComponent,
      CategoryComponent,
      DepositComponent,
      ManufacturerComponent,
      MinimarketComponent,
      TruckComponent,
      DepositComponent,
    NotificationsComponent
  ]
})
export class AdminLayoutModule {}
