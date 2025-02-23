import { ElectricBike } from "../vehicle/electric-bike.class";
import { VehicleType } from "../vehicle/vehicle-type.enum";
import { IBikeParkingSpot } from "./bike-parking-spot.interface";
import { IElectricParkingSpot } from "./electric-parking-spot.interface";
import { ParkingFloor } from "./parking-floor.class";
import { AbstractParkingSpot } from "./parking-spot.abstract-class";
import { ParkingStatus } from "./parking-status.enum";

export class ElectricBikeParkingSpot
  extends AbstractParkingSpot<ElectricBike>
  implements IBikeParkingSpot, IElectricParkingSpot
{
  constructor(
    protected spotNumber: number,
    protected parkingFloor: ParkingFloor
  ) {
    super(spotNumber, parkingFloor, [VehicleType.ELECTRIC_BIKE]);
  }
  chargeVehicle(units: number): void {
    if (this.vehicle && this.status === ParkingStatus.OCCUPIED) {
      this.vehicle.chargeBattery(units);
    }
    throw new Error("Cannot charge vehicle. Spot is vacant.");
  }
}
