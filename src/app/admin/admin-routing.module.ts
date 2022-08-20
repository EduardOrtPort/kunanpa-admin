import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './pages/admin-layout/admin-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';
import { OrderListComponent } from './pages/order-list/order-list.component';
import { OrderFormComponent } from './pages/order-form/order-form.component';


const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'user-profile',
        component: UserProfileComponent
      },
      {
        path: 'productos/:id',
        component: ProductFormComponent
      },
      {
        path: 'productos/nuevo',
        component: ProductFormComponent
      },
      {
        path: 'productos',
        component: ProductListComponent
      },
      {
        path: 'orders/:id',
        component: OrderFormComponent
      },
      {
        path: 'orders',
        component: OrderListComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      }
    ]
  }
]


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AdminRoutingModule { }
