import { VehicleType } from "./vehicle-type.enum";
import { AbstractVehicle } from "./vehicle.abstract-class";

export class Car extends AbstractVehicle {
  basePrice = 25;
  constructor(registrationNumber: string, color: string) {
    super(registrationNumber, color, VehicleType.CAR);
  }
}
