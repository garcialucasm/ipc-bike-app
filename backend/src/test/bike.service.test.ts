
import assert, { fail } from "assert";
import { Bike, BikeStatus } from "../models/bike.model";
import IBikeRepository from "../repositories/bike.repository";
import IBikeService from "../services/bike.service";
import BikeService from "../services/bike.service.impl";
import MockBikeRepository from "./bike.fixtures";


let bikeRepository: IBikeRepository 
let bikeService: IBikeService 

beforeEach(() => {
  bikeRepository = new MockBikeRepository()
  bikeService = new BikeService(bikeRepository)
})

describe("test creating a bike", () => {

  it("returns a valid bike", async () => {
    let bike = await bikeService.createBike(1, "small")

    assert.ok(bike.IsActive)
    assert.equal(bike.CurrentStatus, BikeStatus.FREE)
    assert.equal(bike.Numbering, 1)
    assert.equal(bike.Size, "small")
    assert.ok(bike.CreatedAt)
  })

  it("returns an exception for negative numbering", async () => {
    try{ 
      await bikeService.createBike(-1, "small")
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }
  })

  it("returns an exception for empty string", async () => {
    try{ 
      await bikeService.createBike(1, "")
      assert.fail("should fail")
    } catch (error) {
      assert.ok(error)
    }
  })
})

describe("test change bike status", async () => {
  let bike: Bike = await bikeService.createBike(1, "small")

  beforeEach(async () => {
    bike.CurrentStatus = BikeStatus.FREE
  })

  it("from FREE to BOOKED is ok", async () => {
    let updatedBike = await bikeService.changeStatus(bike, BikeStatus.BOOKED)
    assert.ok(updatedBike.UpdatedAt)
    assert.equal(BikeStatus.BOOKED, updatedBike.CurrentStatus)
  })


  it("from FREE to DISABLED is ok", async () => {
    let updatedBike = await bikeService.changeStatus(bike, BikeStatus.DISABLED)
    assert.ok(updatedBike.UpdatedAt)
    assert.ok(updatedBike.IsActive)
    assert.equal(BikeStatus.DISABLED, updatedBike.CurrentStatus)  
  })

  it("from FREE to INUSE returns an error", async () => { 
    try {
      let updatedBike = await bikeService.changeStatus(bike, BikeStatus.INUSE)
      assert.fail("should throw an exception")
    } catch (error) {
      assert.ok(error)
    }
  })

  it("from BOOKED to FREE is ok", async () => {
    bike.CurrentStatus = BikeStatus.BOOKED
    let updatedBike = await bikeService.changeStatus(bike, BikeStatus.FREE)
    assert.equal(BikeStatus.FREE, updatedBike.CurrentStatus)
  })

  it("from BOOKED to INUSE is ok", async () => {
    bike.CurrentStatus = BikeStatus.BOOKED
    let updatedBike = await bikeService.changeStatus(bike, BikeStatus.INUSE)
    assert.equal(BikeStatus.INUSE, updatedBike.CurrentStatus)
  })


  it("from BOOKED to DISABLED returns an error", async () => { 
    bike.CurrentStatus = BikeStatus.BOOKED
    try {
      let updatedBike = await bikeService.changeStatus(bike, BikeStatus.DISABLED)
      assert.fail("should throw an exception")
    } catch (error) {
      assert.ok(error)
    }
  })


  it("from DISABLED to FREE is ok",async () => {
    bike.CurrentStatus = BikeStatus.DISABLED
    let updatedBike = await bikeService.changeStatus(bike, BikeStatus.FREE)
    assert.equal(BikeStatus.FREE, updatedBike.CurrentStatus)
  })

  it("from DISABLED to INUSE returns an error", async () => { 
    bike.CurrentStatus = BikeStatus.DISABLED
    try {
      let updatedBike = await bikeService.changeStatus(bike, BikeStatus.INUSE)
      assert.fail("should throw an exception")
    } catch (error) {
      assert.ok(error)
    }
  })

  it("from DISABLED to BOOKED returns an error", async () => { 
    bike.CurrentStatus = BikeStatus.DISABLED
    try {
      let updatedBike = await bikeService.changeStatus(bike, BikeStatus.BOOKED)
      assert.fail("should throw an exception")
    } catch (error) {
      assert.ok(error)
    }
  })
})


describe("find all available bikes",async () => {
  beforeEach(async () => {
    bikeService.createBike(1, "small")    
    let bike1 = await bikeService.createBike(2, "big")
    let bike2 = await bikeService.createBike(3, "small")    
    bikeService.createBike(4, "big")
    let bike3 = await bikeService.createBike(5, "small")

    bikeService.changeStatus(bike1, BikeStatus.BOOKED)
    bikeService.changeStatus(bike2, BikeStatus.BOOKED)
    bikeService.changeStatus(bike2, BikeStatus.INUSE)
    bikeService.changeStatus(bike3, BikeStatus.DISABLED)
  })

  it("returns only free bikes", async () => {
    let bikes = await bikeService.findAllAvailable()

    assert.equal(2, bikes.length)

    bikes.forEach((bike) => {
      assert.equal(BikeStatus.FREE, bike.CurrentStatus)
      assert.ok(bike.ID)
      assert.ok([1, 4].includes(bike.ID))
    })
  })
})