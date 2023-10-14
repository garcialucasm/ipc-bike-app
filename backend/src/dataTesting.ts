import { Bike } from "./models/bike.model";
import { User } from "./models/user.model";

// Create a new bike object for testing
const bikeSmall: Bike[] = [
  {
    ID: 1,
    Numbering: "01",
    Size: "small",
  },
  {
    ID: 2,
    Numbering: "02",
    Size: "small",
  },
  {
    ID: 3,
    Numbering: "03",
    Size: "small",
  },
];

// Create a new bike object for testing
const bikeStandard: Bike[] = [
  {
    ID: 4,
    Numbering: "04",
    Size: "standard",
  },
  {
    ID: 5,
    Numbering: "05",
    Size: "standard",
  },
  {
    ID: 6,
    Numbering: "06",
    Size: "standard",
  },
  {
    ID: 7,
    Numbering: "07",
    Size: "standard",
  },
];

// Create a new bike object for testing
const bikeEmptyForTest: Bike[] = [];

// Create a new user object
const user: User[] = [
  {
    ID: 1,
    Name: "Michelly",
  },
  {
    ID: 2,
    Name: "Bent",
  },
];

export { bikeSmall, bikeStandard, user, bikeEmptyForTest };
