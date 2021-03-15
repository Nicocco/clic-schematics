import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { ShellComponent } from "./shell/shell.component";
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "../app-routing.module";
import { NavMenuActions } from "./nav-menu/nav-menu.actions";


@NgModule({
  declarations: [
    ShellComponent,
    NavMenuComponent
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    CommonModule,
    SharedModule
  ],
  exports: [ShellComponent]
})
export class CoreModule { }
