import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';
import { AdminRoutingModule } from './admin-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { IconsComponent } from './pages/icons/icons.component';
import { MapsComponent } from './pages/maps/maps.component';
// import { ToastrModule } from 'ngx-toastr';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { ComponentsModule } from '../components/components.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';
import { SafeHtmlPipe } from '../pipes/safe-html.pipe';
import { TruncatePipe } from "../pipes/truncate.pipe";



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    AdminRoutingModule,
    ComponentsModule

  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    IconsComponent,
    MapsComponent,
    AdminLayoutComponent,
    ProductListComponent,
    ProductFormComponent,
    OrderListComponent,
    OrderFormComponent,
    SafeHtmlPipe,
    TruncatePipe
  ]
})

export class AdminModule {}



