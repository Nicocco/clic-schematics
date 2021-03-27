import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { IPayloadAction, Store } from "@lgm-clic/ts-flux";
import { AppDispatcher } from "./dispatcher";
import { PageRoute } from "../enums/page-route.enum";
import { PageRouteActionType } from "../enums/page-route.actions.enum";
import { Router } from "@angular/router";
import { LoggerService } from "@lgm-clic/logger";
import { MenuStore } from "./menu.store";

@Injectable({ providedIn: 'root' })
export class PageStore extends Store {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  private _currentPage: PageRoute = PageRoute.UNDEFINED;

  //#region -------------------------- SUBSCRIABLES ---------------------------

  private _currentPageSubject: BehaviorSubject<PageRoute> =
    new BehaviorSubject<PageRoute>(this._currentPage);
  public $currentPage: Observable<PageRoute> = this._currentPageSubject.asObservable();

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(protected readonly _dispatcher: AppDispatcher,
    private readonly _router: Router,
    private readonly _logger: LoggerService,
    private readonly _menuStore: MenuStore) {
    super(_dispatcher);
  }

  protected reduce(payload: IPayloadAction): void {
    switch (payload.type) {
      case PageRouteActionType.NAVIGATE: {
        this._dispatcher.waitFor(this._menuStore.dispatchToken);
        this._navigate(payload);
        this._logger.log("page store end");
        break;
      }
      default: {
        break;
      }
    }
  }

  //#region -------------------------- ACTION HANDLER -------------------------

  private _navigate(payload: IPayloadAction): void {
    this._router.navigate([payload.data]);
  }

  //#endregion

  //#endregion
}
