import { Injectable } from "@angular/core";
import { IPayloadAction, Store } from "@lgm-clic/ts-flux";
import { BehaviorSubject, Observable } from "rxjs";
import { User } from "../models/user.model";
import { AppDispatcher } from "./dispatcher";

@Injectable({ providedIn: 'root' })
export class IdentityStore extends Store{

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  private _user: User = new User('5ff3320d-c9c0-4624-a7e7-d643ffe20790');

  //#region -------------------------- SUBSCRIABLES ---------------------------

  private _userSubject: BehaviorSubject<User>
    = new BehaviorSubject<User>(this._user);
  public $user: Observable<User> = this._userSubject.asObservable();

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(protected readonly dispatcher: AppDispatcher) {
    super(dispatcher);
  }

  protected reduce(payload: IPayloadAction): void {
    switch(payload.type) {
      default: {
        break;
      }
    }
  }

  //#region ----------------------------- GETTERS -----------------------------

  public get user(): User {
    return this._user;
  }

  //#endregion

  //#endregion
}
