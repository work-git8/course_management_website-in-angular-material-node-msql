import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { RouteGaurdService } from '../services/route-gaurd.service';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewBillComponent } from './view-bill/view-bill.component';
import { ManageUserComponent } from './manage-user/manage-user.component';

export const MaterialRoutes: Routes = [
  {
    path: 'course',
    component: ManageProductComponent,
    canActivate: [RouteGaurdService],
    data: {
      expectedRole: ['admin'],
    },
  },

  {
    path: 'order',
    component: ManageOrderComponent,
    canActivate: [RouteGaurdService],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },

  {
    path: 'bill',
    component: ViewBillComponent,
    canActivate: [RouteGaurdService],
    data: {
      expectedRole: ['admin', 'user'],
    },
  },

  {
    path: 'user',
    component: ManageUserComponent,
    canActivate: [RouteGaurdService],
    data: {
      expectedRole: ['admin'],
    },
  },
];
