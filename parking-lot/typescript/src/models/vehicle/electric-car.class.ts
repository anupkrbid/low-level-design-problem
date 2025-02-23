import { AbstractElectricVehicle } from "./electric-vehicle.abstract-class";
import { VehicleType } from "./vehicle-type.enum";

export class ElectricCar extends AbstractElectricVehicle {
  basePrice = 25;
  constructor(registrationNumber: string, color: string, batteryLevel: number) {
    super(registrationNumber, color, VehicleType.ELECTRIC_CAR, batteryLevel);
  }
}
