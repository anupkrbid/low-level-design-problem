import { VehicleType } from "./vehicle-type.enum";

export abstract class AbstractVehicle {
  abstract basePrice: number;
  constructor(
    protected registrationNumber: string,
    protected color: string,
    protected type: VehicleType
  ) {}

  getType(): VehicleType {
    return this.type;
  }
}
