import { Bike } from "./../models/BikeModel";
import { User } from "../models/UserModel";

// Create a new bike object for testing
const bikeSmall: Bike[] = [
  {
    id: 1,
    numbering: "01",
    size: "small",
  },
  {
    id: 2,
    numbering: "02",
    size: "small",
  },
  {
    id: 3,
    numbering: "03",
    size: "small",
  },
];

// Create a new bike object for testing
const bikeStandard: Bike[] = [
  {
    id: 4,
    numbering: "04",
    size: "standard",
  },
  {
    id: 5,
    numbering: "05",
    size: "standard",
  },
  {
    id: 6,
    numbering: "06",
    size: "standard",
  },
  {
    id: 7,
    numbering: "07",
    size: "standard",
  },
];

// Create a new bike object for testing
const bikeEmptyForTest: Bike[] = [];

// Create a new user object
const user: User[] = [
  {
    id: 1,
    name: "Michelly",
  },
  {
    id: 2,
    name: "Bent",
  },
];

export { bikeSmall, bikeStandard, user, bikeEmptyForTest };
