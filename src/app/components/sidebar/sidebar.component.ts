import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: 'dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: 'orders', title: 'Pedidos',  icon:'ni-box-2 text-info', class: '' },
    { path: 'productos', title: 'Productos',  icon:'ni-shop text-red', class: '' },
    { path: 'user-profile', title: 'Mi perfil',  icon:'ni-single-02 text-yellow', class: '' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
/*
{ path: 'icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
{ path: 'maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
*/