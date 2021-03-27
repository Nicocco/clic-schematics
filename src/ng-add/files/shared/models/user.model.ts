import { ModelBase } from "../class-core/model.base";


export class User extends ModelBase<User> {

  //#region
  //===========================================================================
  //                                ATTRIBUTS
  //===========================================================================

  private _imageUrl?: string;
  private _name: string = 'Nom';
  private _firstName: string = 'Prénom';

  //#endregion

  //#region
  //===========================================================================
  //                                METHODES
  //===========================================================================

  constructor(entityGuid: string | undefined = undefined) {
    super(entityGuid);
  }

  //#region ---------------------------- GETTERS ------------------------------

  public get imageUrl(): string | undefined {
    return this._imageUrl;
  }

  public get name(): string {
    return this._name;
  }

  public get firstName(): string {
    return this._firstName;
  }

  public get initials(): string {
    return this.firstName.substring(0, 1).toUpperCase()
      + this.name.substring(0, 1).toUpperCase();
  }

  //#endregion

  //#region ---------------------------- ABSTRACT -----------------------------

  //#endregion

  //#endregion

}
