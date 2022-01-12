import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { ProductsComponent } from "../../pages/products/products.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { AnnouncesComponent } from "../../pages/announces/announces.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    BsDropdownModule,
  ],
  declarations: [
    DashboardComponent,
    UserComponent,
    TablesComponent,
    ProductsComponent,
    AnnouncesComponent,
    NotificationsComponent
  ]
})
export class AdminLayoutModule {}
