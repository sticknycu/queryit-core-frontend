import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { PromotionsComponent } from "../../pages/promotions/promotions.component";
import {CategoryComponent} from '../../pages/category/category.component';
import {DepositComponent} from '../../pages/deposits/deposit.component';
import {ManufacturerComponent} from '../../pages/manufacturers/manufacturer.component';
import {MinimarketComponent} from '../../pages/minimarkets/minimarket.component';
import {TruckComponent} from '../../pages/trucks/truck.component';

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "products", component: ProductsComponent },
  { path: "promotions", component: PromotionsComponent },
  { path: "categories", component: CategoryComponent },
  { path: "deposits", component: DepositComponent },
  { path: "manufacturers", component: ManufacturerComponent },
  { path: "minimarkets", component: MinimarketComponent },
  { path: "trucks", component: TruckComponent },
  { path: "deposits", component: DepositComponent },
  { path: "notifications", component: NotificationsComponent },
];
