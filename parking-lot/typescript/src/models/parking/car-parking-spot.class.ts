import { Bike } from "../vehicle/bike.class";
import { Car } from "../vehicle/car.class";
import { VehicleType } from "../vehicle/vehicle-type.enum";
import { ICarParkingSpot } from "./car-parking-spot.interface";
import { ParkingFloor } from "./parking-floor.class";
import { AbstractParkingSpot } from "./parking-spot.abstract-class";

export class CarParkingSpot
  extends AbstractParkingSpot<Car | Bike>
  implements ICarParkingSpot
{
  constructor(
    protected spotNumber: number,
    protected parkingFloor: ParkingFloor
  ) {
    super(spotNumber, parkingFloor, [VehicleType.CAR, VehicleType.BIKE]);
  }
}
