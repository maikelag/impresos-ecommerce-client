import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PermissionService, RoleService, UserService } from './business-logic/services/security';
import { ProductService } from './business-logic/services/products/product.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [UserService, RoleService, PermissionService, ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
