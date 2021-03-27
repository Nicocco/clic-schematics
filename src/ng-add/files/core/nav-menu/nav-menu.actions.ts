import { PageRouteActionType } from "src/app/shared/enums/page-route.actions.enum";
import { PageRoute } from "src/app/shared/enums/page-route.enum";
import { AppDispatcher } from "src/app/shared/flux/dispatcher";

export class NavMenuActions {

  constructor(private readonly dispatcher: AppDispatcher) { }

  public navigate(pageNameToNavigate: PageRoute): void {
    this.dispatcher.dispatch({
      type: PageRouteActionType.NAVIGATE,
      data: pageNameToNavigate
    });
  }

}
