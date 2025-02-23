import { AbstractElectricVehicle } from "./electric-vehicle.abstract-class";
import { VehicleType } from "./vehicle-type.enum";

export class ElectricBike extends AbstractElectricVehicle {
  basePrice = 10;
  constructor(registrationNumber: string, color: string, batteryLevel: number) {
    super(registrationNumber, color, VehicleType.ELECTRIC_BIKE, batteryLevel);
  }
}
