import { IElectricPoweredVehicle } from "./electric-powered-vehicle.interface";
import { VehicleType } from "./vehicle-type.enum";
import { AbstractVehicle } from "./vehicle.abstract-class";

export abstract class AbstractElectricVehicle
  extends AbstractVehicle
  implements IElectricPoweredVehicle
{
  constructor(
    registrationNumber: string,
    color: string,
    type: VehicleType,
    protected batteryLevel: number
  ) {
    super(registrationNumber, color, type);
  }
  chargeBattery(amount: number = 20): void {
    // Increase battery level by the given amount, up to a maximum of 100%
    this.batteryLevel = Math.min(this.batteryLevel + amount, 100);
    console.log(`Battery charged to ${this.batteryLevel}%.`);
  }

  getBatteryLevel(): number {
    return this.batteryLevel;
  }
}
