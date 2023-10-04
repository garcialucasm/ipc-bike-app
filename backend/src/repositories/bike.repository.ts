// import connection from "../db";
// import Bike from "../models/bike.model";

// interface IBikeRepository {
//   save(bike: Bike): Promise<Bike>;
//   retrieveAll(searchParams: { Numbering: number; Size: string; CurrentStatus: string }): Promise<Bike[]>;
//   retrieveById(bikeId: number): Promise<Bike | undefined>;
//   update(bike: Bike): Promise<number>;
//   delete(bikeId: number): Promise<number>;
//   deleteAll(): Promise<number>;
// }

// class BikeRepository implements IBikeRepository {

//   retrieveAll(searchParams: { Numbering?: number; Size?: string; CurrentStatus?: string }): Promise<Bike[]> {}

//   retrieveById(bikeId: number): Promise<Bike> {}

//   update(bike: Bike): Promise<number> {}

//   delete(bikeId: number): Promise<number> {}

//   deleteAll(): Promise<number> {}
// }

// export default new BikeRepository();
