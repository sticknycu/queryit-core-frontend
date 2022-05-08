import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { CategoryComponent } from './pages/category/category.component';
import { DepositComponent } from './pages/deposits/deposit.component';
import { ManufacturerComponent } from './pages/manufacturers/manufacturer.component';
import { MinimarketComponent } from './pages/minimarkets/minimarket.component';
import { TruckComponent } from './pages/trucks/truck.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, CategoryComponent, DepositComponent, ManufacturerComponent, MinimarketComponent, TruckComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
