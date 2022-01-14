import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { PromotionsComponent } from "../../pages/promotions/promotions.component";
import { AnnouncesComponent } from "../../pages/announces/announces.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "products", component: ProductsComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "promotions", component: PromotionsComponent },
  { path: "announces", component: AnnouncesComponent },
];
