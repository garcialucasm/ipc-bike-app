import { Bike, BikeStatus } from "../models/bike.model";
import { Booking, BookingStatus, BookingType } from "../models/booking.model";
import { User, UserType, UserStatus } from "../models/user.model";


function filterPropertiesWithPrefix(object: any, prefix: string) : any { 
  const dotedPrefix = prefix + '.'
  const filtered : string[] = Object.keys(object).filter(key => key.startsWith(dotedPrefix))
  let res = {}
  filtered.forEach((key) => {
    const newKey: string = key.split(dotedPrefix)[1]
    res[newKey] = object[key]
  });

  return res
}

function bookingFromRow(row: any) : Booking {
  let user : User = userFromRow(filterPropertiesWithPrefix(row, 'u'))
  let bikes: Bike[] = bikeFromRow(filterPropertiesWithPrefix(row, 'b'))

  return {
    ID: Number.parseInt(row['id']),
    User: user,
    Bike: bikes,
    Type: row['type'] ? BookingType[row['type'] as keyof typeof BookingType] : BookingType.SINGLE,
    Status: row['status'] ? BookingStatus[row['status'] as keyof typeof BookingStatus] : BookingStatus.BOOKED,
    Notes: row['notes'],
    ReturnedCondition: row['returned_condition'],
    CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined, 
    ConfirmedAt: row['confirmed_at'] ? new Date(row['confirmed_at']) : undefined, 
    ReturnedAt: row['returned_at'] ? new Date(row['returned_at']) : undefined, 
  }
}

function bikeFromRow(row: any) : Bike {
 return { 
    ID: Number.parseInt(row['id']),
    IsActive: row['is_active']? new Boolean(row['is_active']).valueOf() : false,
    CurrentStatus: row['current_status'] ? BikeStatus[row['current_status'] as keyof typeof BikeStatus] : BikeStatus.DISABLED,
    Numbering: Number.parseInt(row['numbering']),
    Size: row['size'],
    CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
    UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
    DeltedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined,
  }
}

function userFromRow(row: any) : User {
  return {
    ID: 1,
    Name: "",
    Room: "",
    Type: UserType.STUDENT,
    Term: "",
    Status: UserStatus.FREE,
    IsActive: true,
    CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
    UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
    DeletedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined
  }
}

export {bookingFromRow, bikeFromRow, userFromRow}
