import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PageRoute } from 'src/app/shared/enums/page-route.enum';
import { AppDispatcher } from 'src/app/shared/flux/dispatcher';
import { IdentityStore } from 'src/app/shared/flux/identity.store';
import { MenuStore } from 'src/app/shared/flux/menu.store';
import { User } from 'src/app/shared/models/user.model';
import { NavMenuActions } from './nav-menu.actions';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
})
export class NavMenuComponent implements OnDestroy {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  //#region ----------------------------- PUBLICS -----------------------------

  public PageRoute = PageRoute;

  //#endregion

  //#region ---------------------------- PRIVATES -----------------------------

  private _navMenuAction: NavMenuActions;
  private _currentUser!: User;
  private _isMenuOpen!: boolean;

  //#endregion

  //#region ---------------------------- PRIVATES -----------------------------

  private _currentUserSubscription: Subscription = this._identityStore.$user
    .subscribe((newCurrentUser: User) => {
      this._currentUser = newCurrentUser;
    });

    private _menuOpenSubscription: Subscription = this._menuStore.$isMenuOpen
    .subscribe((newValueMenuOpenStatus: boolean) => {
      this._isMenuOpen = newValueMenuOpenStatus;
    });

  //#endregion

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(private readonly _dispatcher: AppDispatcher,
    private readonly _identityStore: IdentityStore,
    private readonly _menuStore: MenuStore) {
    this._navMenuAction = new NavMenuActions(_dispatcher);
  }

  public ngOnDestroy(): void {
    this._currentUserSubscription.unsubscribe();
    this._menuOpenSubscription.unsubscribe();
  }

  //#region ---------------------------- GETTERS ------------------------------

  public get currentUser(): User {
    return this._currentUser;
  }

  public get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }

  //#endregion

  //#region ---------------------- DIRECT ACTIONS ON UI -----------------------

  public navigateTo(pageNameToNavigate: PageRoute): void {
    this._navMenuAction.navigate(pageNameToNavigate);
  }

  //#endregion

  //#endregion

}
