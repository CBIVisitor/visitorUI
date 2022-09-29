import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RouteInfo } from './vertical-sidebar.metadata';
import { ROUTES } from './vertical-menu-items';
import { AuthService } from 'src/app/auth/Service/auth.service';


@Injectable({
    providedIn: 'root'
})
export class VerticalSidebarService {

    public screenWidth: any;
    public collapseSidebar: boolean = false;
    public fullScreen: boolean = false;

    MENUITEMS: RouteInfo[] = ROUTES;

    items = new BehaviorSubject<RouteInfo[]>(this.MENUITEMS);

    constructor( ) {
 
       
    }
}
