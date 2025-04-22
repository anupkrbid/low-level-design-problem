import { UserClassificationType } from "../enums/user-classification.enum";

export class User<T extends UserClassificationType> {
  constructor(private name: string, private classification: T) {}

  public getName(): string {
    return this.name;
  }

  public getClassification(): UserClassificationType {
    return this.classification;
  }
}
