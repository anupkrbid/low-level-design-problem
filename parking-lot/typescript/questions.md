1. ElectricPoweredVehicles whould have a charge level when they come to the parking lot, so they should have a battery level at that point. Vehicle class cannot accept battery level, so should be create another abstract class ElectyricVehicle that extends vehicle so taht those can take a battery level in the constructor (I implemented that)
2. now that we have a electricVehicle abstract class so we need the ElectricPoweredVehicle interface
   - can we add those method in the electric vehicle abstract class only
   - or should keep the interface but impelemnt it in the electric vehicle abstract class (i have implemented this)
