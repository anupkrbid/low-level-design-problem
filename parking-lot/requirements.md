# Requirement Analysis for Parking Lot 🚗💨

- Design a parking lot system to support N cars/bikes
- Parking lot has a number associated, which increases as we go far from entry point and starts with 1
- Automated ticketing should happen
- When a car comes, we take the color of the car and registration number of the car
- We assign the nearest parking lot and also allow leaving the car from that lot
- Once the car leaves, we mark the slot available again
- A bike can be parked in any nearest empty spot.
- Whereas a car can be only parked in the nearest empty car spot.
- There are configurable number of slots for electric cars and bikes also.
- On exit, the user should be able to pay via cash, card, or Fastag.
- Support of multiple floors
- Pricing per hour differs for bikes and cars

# Functionalities to support:

- Given a vehicle, we should be able to park it and get the ticket.
- Given a vehicle, we should be able to unpark it and pay.
- Given a spot, you should be able to find the vehicle parked in it.
- Given a vehicle number, find the slot in which it is parked.
- Return registration numbers of all cars of a particular color.
- Return all spot/slot numbers where cars of a particular color are parked.
