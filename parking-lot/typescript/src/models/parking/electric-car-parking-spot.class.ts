import { ElectricBike } from "../vehicle/electric-bike.class";
import { ElectricCar } from "../vehicle/electric-car.class";
import { VehicleType } from "../vehicle/vehicle-type.enum";
import { ICarParkingSpot } from "./car-parking-spot.interface";
import { IElectricParkingSpot } from "./electric-parking-spot.interface";
import { ParkingFloor } from "./parking-floor.class";
import { AbstractParkingSpot } from "./parking-spot.abstract-class";
import { ParkingStatus } from "./parking-status.enum";

export class ElectricCarParkingSpot
  extends AbstractParkingSpot<ElectricCar | ElectricBike>
  implements ICarParkingSpot, IElectricParkingSpot
{
  constructor(
    protected spotNumber: number,
    protected parkingFloor: ParkingFloor
  ) {
    super(spotNumber, parkingFloor, [
      VehicleType.ELECTRIC_CAR,
      VehicleType.ELECTRIC_BIKE,
    ]);
  }

  chargeVehicle(units: number): void {
    if (this.vehicle && this.status === ParkingStatus.OCCUPIED) {
      this.vehicle.chargeBattery(units);
    } else {
      throw new Error(
        "Cannot charge vehicle. Spot is vacant or vehicle type is incorrect."
      );
    }
  }
}
