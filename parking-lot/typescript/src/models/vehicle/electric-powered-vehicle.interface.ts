export interface IElectricPoweredVehicle {
  chargeBattery(): void;
  getBatteryLevel(): number;
}
