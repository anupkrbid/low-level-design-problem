import { Nullable } from "../../utils/custom-types";
import { VehicleType } from "../vehicle/vehicle-type.enum";
import { AbstractVehicle } from "../vehicle/vehicle.abstract-class";
import { ParkingFloor } from "./parking-floor.class";
import { ParkingStatus } from "./parking-status.enum";

export abstract class AbstractParkingSpot<T extends AbstractVehicle> {
  protected vehicle: Nullable<T> = null;
  protected status: ParkingStatus = ParkingStatus.VACANT;
  constructor(
    protected spotNumber: number,
    protected parkingFloor: ParkingFloor,
    protected allowedVehicleTypes: VehicleType[]
  ) {
    this.parkingFloor.assignParkingSpot(this);
  }

  park(vehicle: T): void {
    if (this.allowedVehicleTypes.includes(vehicle.getType())) {
      this.vehicle = vehicle;
      this.status = ParkingStatus.OCCUPIED;
    } else {
      throw new Error("Vehicle type not allowed in this parking spot.");
    }
  }

  unpark() {
    this.vehicle = null;
    this.status = ParkingStatus.VACANT;
  }
}
