import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/Service/auth.service';
import { RouteInfo } from './vertical-sidebar.metadata';
import { VerticalSidebarService } from './vertical-sidebar.service';


@Component({
  selector: 'app-vertical-sidebar',
  templateUrl: './vertical-sidebar.component.html'
})
export class VerticalSidebarComponent {
  @Input() showClass: boolean = false;
  @Output() notify: EventEmitter<boolean> = new EventEmitter<boolean>();
  showMenu = '';
  showSubMenu = '';
  public sidebarnavItems: RouteInfo[] = [];
  path = '';
  username:string = ''

  constructor(private menuServise: VerticalSidebarService, private router: Router, public authservice: AuthService) {
    this.menuServise.items.subscribe(menuItems => {
      this.sidebarnavItems = menuItems;
      console.log("check > sidebarnavItems")
       console.log(this.authservice.getRols().includes("Administrator"))
      if (this.authservice.getRols().includes("Administrator")) {
         
        console.log("includes > Administrator")
        this.sidebarnavItems.map(s=>s.permesion=true);    
      } else {
        console.log("includes > Other")
        this.sidebarnavItems.map(s => s.permesion = this.authservice.getRols().includes(s.label)); 
      }
      console.log(menuItems)














      this.username=  this.authservice.GetUsername()

      // Active menu 
      this.sidebarnavItems.filter(m => m.submenu.filter(
        (s) => {
          if (s.path === this.router.url) {
            this.path = m.title;
          }
        }
      ));
      this.addExpandClass(this.path);
    });
  }
  signOut(){
    console.log("test خروج");
    this.authservice.signOut()
  }




  addExpandClass(element: any) {
    if (element === this.showMenu) {
      this.showMenu = '0';
    } else {
      this.showMenu = element;
    }
  }

  addActiveClass(element: any) {
    if (element === this.showSubMenu) {
      this.showSubMenu = '0';
    } else {
      this.showSubMenu = element;
    }
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  handleNotify() {
    this.notify.emit(!this.showClass);
  }


}
