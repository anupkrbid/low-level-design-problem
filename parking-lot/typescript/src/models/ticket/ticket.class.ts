import { v4 as uuidv4 } from "uuid";
import { Nullable } from "../../utils/custom-types";
import { AbstractParkingSpot } from "../parking/parking-spot.abstract-class";
import { AbstractVehicle } from "../vehicle/vehicle.abstract-class";

export class Ticket {
  private id: string;
  // private checkInTime: Date;
  private checkOutTime: Nullable<Date> = null;

  constructor(
    private parkingSpot: AbstractParkingSpot<AbstractVehicle>,
    private vehicle: AbstractVehicle,
    private checkInTime?: Date // Optional parameter for check-in time
  ) {
    this.id = uuidv4();
    this.checkInTime = checkInTime ? checkInTime : new Date();
  }
}
