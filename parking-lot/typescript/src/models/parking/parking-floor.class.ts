import { AbstractVehicle } from "../vehicle/vehicle.abstract-class";
import { AbstractParkingSpot } from "./parking-spot.abstract-class";

export class ParkingFloor {
  private parkingSpots: AbstractParkingSpot<AbstractVehicle>[] = [];
  constructor(private floorNumber: number) {}

  assignParkingSpot(spot: AbstractParkingSpot<AbstractVehicle>) {
    this.parkingSpots.push(spot);
  }
}
