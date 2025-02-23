import { VehicleType } from "./vehicle-type.enum";
import { AbstractVehicle } from "./vehicle.abstract-class";

export class Bike extends AbstractVehicle {
  basePrice = 10;
  constructor(registrationNumber: string, color: string) {
    super(registrationNumber, color, VehicleType.BIKE);
  }
}
