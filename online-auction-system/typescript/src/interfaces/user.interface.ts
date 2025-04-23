import { UserClassificationType } from "../enums";

export interface IUser<T extends UserClassificationType> {
  getName(): string;
  getClassification(): UserClassificationType;
}
