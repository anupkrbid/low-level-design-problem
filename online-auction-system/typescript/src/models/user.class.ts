import { UserClassificationType } from "../enums/user-classification.enum";

export class User<T extends UserClassificationType> {
  constructor(
    private name: string,
    private email: string,
    private classification: T
  ) {}

  public getName(): string {
    return this.name;
  }

  public getEmail(): string {
    return this.email;
  }

  public getClassification(): UserClassificationType {
    return this.classification;
  }
}
