import { UserClassificationType } from "../enums";
import { IUser } from "../interfaces";

export class User<T extends UserClassificationType> implements IUser<T> {
  constructor(private name: string, private classification: T) {}

  public getName(): string {
    return this.name;
  }

  public getClassification(): UserClassificationType {
    return this.classification;
  }
}
