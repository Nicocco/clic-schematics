import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { MenuMode } from "src/app/shared/enums/menu-mode.enum";
import { AppDispatcher } from "src/app/shared/flux/dispatcher";
import { MenuStore } from "src/app/shared/flux/menu.store";
import { ShellActions } from "./Shell.actions";

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html'
})
export class ShellComponent implements OnDestroy {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  //#region ------------------------- SUBSCRIPTIONS ---------------------------

  private _shellAction: ShellActions;
  private _isMenuOpen: boolean = false;
  private _menuMode: MenuMode = MenuMode.SIDE;

  //#endregion

  //#region ------------------------- SUBSCRIPTIONS ---------------------------

  private _MenuOpenStateSubscription: Subscription;
  private _MenuModeSubscription: Subscription;

  //#endregion

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(private readonly _dispatcher: AppDispatcher,
    private readonly menuStore: MenuStore) {
    this._shellAction = new ShellActions(_dispatcher);

    this._MenuOpenStateSubscription = this.menuStore.$isMenuOpen.subscribe(
      (newMenuOpenStateValue: boolean) => { this._isMenuOpen = newMenuOpenStateValue; }
    );

    this._MenuModeSubscription = this.menuStore.$menuMode.subscribe(
      (newMenuMode: MenuMode) => { this._menuMode = newMenuMode; }
    );
  }

  public ngOnDestroy(): void {
    this._MenuOpenStateSubscription.unsubscribe();
  }

  //#region ---------------------------- GETTERS ------------------------------

  public get isOpened(): boolean {
    return this._isMenuOpen;
  }

  public get menuMode(): MenuMode {
    return this._menuMode;
  }

  //#endregion

  //#region ---------------------- DIRECT ACTIONS ON UI -----------------------

  public toogleSideNav(): void {
    this._shellAction.toogleNavMenu();
  }

  public closeSideNav(): void {
    this._shellAction.closeNavMenu();
  }

  //#endregion

  //#endregion

}
