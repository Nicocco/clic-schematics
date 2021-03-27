import { Injectable } from "@angular/core";
import { LoggerService } from "@lgm-clic/logger";
import { IPayloadAction, Store } from "@lgm-clic/ts-flux";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuMode } from "../enums/menu-mode.enum";
import { MenuActionType } from "../enums/menu.actions.enum";
import { PageRouteActionType } from "../enums/page-route.actions.enum";
import { AppDispatcher } from "./dispatcher";
import { PageStore } from "./page.store";

@Injectable({ providedIn: 'root' })
export class MenuStore extends Store {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  private _isMenuOpen: boolean = innerWidth >= 800;
  private _menuMode: MenuMode = MenuMode.OVER;

  //#region -------------------------- SUBSCRIABLES ---------------------------

  private _isMenuOpenSubject: BehaviorSubject<boolean>
    = new BehaviorSubject<boolean>(this._isMenuOpen);
  public $isMenuOpen: Observable<boolean> = this._isMenuOpenSubject.asObservable();

  private _menuModeSubject: BehaviorSubject<MenuMode> =
    new BehaviorSubject<MenuMode>(this._menuMode);
  public $menuMode: Observable<MenuMode> = this._menuModeSubject.asObservable();

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(protected readonly _dispatcher: AppDispatcher,
    private readonly _logger: LoggerService,
    /*private readonly _pageStore: PageStore*/) {
    super(_dispatcher);
    this._resize();
  }

  protected reduce(payload: IPayloadAction): void {
    switch (payload.type) {
      case MenuActionType.TOGGLE: {
        this._toogleMenu();
        break;
      }
      case MenuActionType.CLOSE: {
        this._closeMenu();
        break;
      }
      case PageRouteActionType.NAVIGATE: {
        //this._dispatcher.waitFor(this._pageStore.dispatchToken);
        this._closeMenu();
        this._logger.log("menu store end");
        break;
      }
      case PageRouteActionType.RESIZE: {
        this._resize();
        break;
      }
      default: {
        break;
      }
    }
  }

  //#region ----------------------------- SETTERS -----------------------------


  private set isMenuOpen(newValue: boolean) {
    this._isMenuOpen = newValue;
    this._isMenuOpenSubject.next(this._isMenuOpen);
  }

  private set menuMode(NewValue: MenuMode) {
    this._menuMode = NewValue;
    this._menuModeSubject.next(this._menuMode);
  }

  //#endregion

  //#region -------------------------- ACTION HANDLER -------------------------

  private _toogleMenu(): void {
    this.isMenuOpen = !this._isMenuOpen;
  }

  private _closeMenu(): void {
    if (this._isMenuOpen !== false
      && this._menuMode !== MenuMode.SIDE) {
      this.isMenuOpen = false;
    }
  }

  private _openMenu(): void {
    if (this._isMenuOpen !== true) {
      this._isMenuOpen = true;
    }
  }

  private _resize(): void {
    if (innerWidth >= 800) {
      this.menuMode = MenuMode.SIDE;
    } else if (innerWidth >= 550) {
      this.menuMode = MenuMode.PUSH;
    } else {
      this.menuMode = MenuMode.OVER;
    }
  }

  //#endregion

  //#endregion
}
