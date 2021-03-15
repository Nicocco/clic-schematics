import { MenuActionType } from "src/app/shared/enums/menu.actions.enum";
import { AppDispatcher } from "src/app/shared/flux/dispatcher";

export class ShellActions {

  constructor(private readonly _dispatcher: AppDispatcher) {  }

  /**
   * Toogle the nav menu
   */
  public toogleNavMenu(): void {
    this._dispatcher.dispatch({
      type: MenuActionType.TOGGLE
    });
  }

  /**
   * Close the nav menu
   */
  public closeNavMenu(): void {
    this._dispatcher.dispatch({
      type: MenuActionType.CLOSE
    });
  }

}
