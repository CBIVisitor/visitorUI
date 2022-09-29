 
import { DOCUMENT } from "@angular/common";
import { Component, OnInit, HostListener, Inject } from "@angular/core";
import { Router } from "@angular/router";
import { PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
@Component({
  selector: 'app-blank-layout',
  templateUrl: './blank.component.html',
  styleUrls: []
})
export class BlankComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
active = 1;

constructor(
  public router: Router,
    @Inject(DOCUMENT) private document: Document
  ) { }

tabStatus = "justified";

  public isCollapsed = false;

  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;

options = {
  theme: "light", // two possible values: light, dark
  dir: "rtl", // two possible values: ltr, rtl
  layout: "vertical", // two possible values: vertical, horizontal
  sidebartype: "full", // four possible values: full, iconbar, overlay, mini-sidebar
  sidebarpos: "fixed", // two possible values: fixed, absolute
  headerpos: "fixed", // two possible values: fixed, absolute
  boxed: "full", // two possible values: full, boxed
  navbarbg: "skin1", // six possible values: skin(1/2/3/4/5/6)
  sidebarbg: "skin6", // six possible values: skin(1/2/3/4/5/6)
  logobg: "skin6", // six possible values: skin(1/2/3/4/5/6)
};

Logo() {
  this.expandLogo = !this.expandLogo;
}

ngOnInit() {
  if (this.router.url === "/") {
    this.router.navigate(["/"]);
  }
  this.defaultSidebar = this.options.sidebartype;
  this.handleSidebar();
  if (this.options.dir == "rtl") {
    this.document.body.classList.add("rtl");

  }
}

rtlToggle() {
  this.document.body.classList.toggle("rtl");
}

@HostListener("window:resize", ["$event"])
onResize(event: string) {
  this.handleSidebar();
}

handleSidebar() {
  this.innerWidth = window.innerWidth;
  switch (this.defaultSidebar) {
    case "full":
    case "iconbar":
      if (this.innerWidth < 1170) {
        this.options.sidebartype = "mini-sidebar";
      } else {
        this.options.sidebartype = this.defaultSidebar;
      }
      break;

    case "overlay":
      if (this.innerWidth < 767) {
        this.options.sidebartype = "mini-sidebar";
      } else {
        this.options.sidebartype = this.defaultSidebar;
      }
      break;

    default:
  }
}

toggleSidebarType() {
  switch (this.options.sidebartype) {
    case "full":
    case "iconbar":
      this.options.sidebartype = "mini-sidebar";
      break;

    case "overlay":
      this.showMobileMenu = !this.showMobileMenu;
      break;

    case "mini-sidebar":
      if (this.defaultSidebar === "mini-sidebar") {
        this.options.sidebartype = "full";
      } else {
        this.options.sidebartype = this.defaultSidebar;
      }
      break;

    default:
  }
}

handleClick(event: boolean) {
  this.showMobileMenu = event;
}
}
