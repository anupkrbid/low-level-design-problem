import { Bike } from "../vehicle/bike.class";
import { VehicleType } from "../vehicle/vehicle-type.enum";
import { IBikeParkingSpot } from "./bike-parking-spot.interface";
import { ParkingFloor } from "./parking-floor.class";
import { AbstractParkingSpot } from "./parking-spot.abstract-class";

export class BikeParkingSpot
  extends AbstractParkingSpot<Bike>
  implements IBikeParkingSpot
{
  constructor(
    protected spotNumber: number,
    protected parkingFloor: ParkingFloor
  ) {
    super(spotNumber, parkingFloor, [VehicleType.BIKE]);
  }
}
