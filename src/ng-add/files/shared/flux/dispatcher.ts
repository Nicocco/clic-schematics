import { Injectable } from "@angular/core";
import { LoggerService } from "@lgm-clic/logger";
import { Dispatcher, IPayloadAction } from  "@lgm-clic/ts-flux";

@Injectable({providedIn: 'root'})
export class AppDispatcher extends Dispatcher {
  constructor(private readonly _logger: LoggerService) { super(); }

  public dispatch(payload: IPayloadAction): void {
    this._logger.info("Action dispatched : " + payload.type, payload);
    super.dispatch(payload);
  }
}
