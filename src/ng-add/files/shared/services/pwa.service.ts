import { ApplicationRef, Injectable } from "@angular/core";
import { SwUpdate } from "@angular/service-worker";
import { from, Observable, of, timer } from "rxjs";
import { catchError, first, mapTo, switchMap, timeout } from "rxjs/operators";
import { PwaConstantes } from "../constantes/pwa.constantes";

@Injectable({ providedIn: 'root' })
export class PwaService {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(private readonly _appRef: ApplicationRef,
    private readonly _swUpdate: SwUpdate) {
    if (this._swUpdate.isEnabled) {
      this._appRef.isStable.pipe(
        first(isStable => isStable === true),
        switchMap(() => this._swUpdate.available),
      ).subscribe(() => {
        this._swUpdate.activateUpdate().then(() => document.location.reload());
      });
    }
  }

  //#region------------------------- AOTHER METHODES --------------------------

  public checkForUpdate(): Observable<boolean> {
    if (this._swUpdate.isEnabled) {
      const available$ = this._swUpdate.available.pipe(
        mapTo(true),
        timeout(PwaConstantes.SPLASH_SCREEN_DEFAUT_TIMER),
        catchError(() => of(false)),
      );

      return from(this._swUpdate.checkForUpdate()).pipe(
        switchMap(() => available$),
      );
    }

    return timer(PwaConstantes.SPLASH_SCREEN_DEFAUT_TIMER).pipe(mapTo(false));
  }

  //#endregion

  //#endregion
}
