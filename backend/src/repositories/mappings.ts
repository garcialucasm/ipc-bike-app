import { Bike, BikeStatus } from "../models/bike.model";
import { Booking, BookingStatus, BookingType } from "../models/booking.model";
import { Account } from "../models/account.model";
import { User, UserType, UserStatus } from "../models/user.model";


function filterPropertiesWithPrefix(object: any, prefix: string): any {
  const dotedPrefix = prefix + '.'
  const filtered: string[] = Object.keys(object).filter(key => key.startsWith(dotedPrefix))
  let res: Map<String, any> = new Map<String, any>()

  filtered.forEach((key: string) => {
    const newKey: string = key.replace(dotedPrefix, '')
    res.set(newKey, object[key])
  })

  return Object.fromEntries(res)
}

function bookingFromRow(row: any): Booking {
  let bookingData = filterPropertiesWithPrefix(row, 'bk')
  let user: User = userFromRow(filterPropertiesWithPrefix(row, 'u'))

  return {
    ID: Number.parseInt(bookingData['id']),
    User: user,
    Bike: [],
    BikeCount: Number.parseInt(bookingData['bike_count']),
    Type: bookingData['type'] ? BookingType[bookingData['type'] as keyof typeof BookingType] : BookingType.SINGLE,
    Status: bookingData['status'] ? BookingStatus[bookingData['status'] as keyof typeof BookingStatus] : BookingStatus.BOOKED,
    Notes: bookingData['notes'],
    ReturnedCondition: bookingData['returned_condition'],
    CreatedAt: bookingData['created_at'] ? new Date(row['created_at']) : undefined,
    ConfirmedAt: bookingData['confirmed_at'] ? new Date(row['confirmed_at']) : undefined,
    ReturnedAt: bookingData['returned_at'] ? new Date(row['returned_at']) : undefined,
  }
}

function bikeFromRow(row: any): Bike {
  return {
    ID: Number.parseInt(row['id']),
    IsActive: row['is_active'] ? new Boolean(row['is_active']).valueOf() : false,
    CurrentStatus: row['current_status'] ? BikeStatus[row['current_status'] as keyof typeof BikeStatus] : BikeStatus.DISABLED,
    Numbering: Number.parseInt(row['numbering']),
    Size: row['size'],
    CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
    UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
    DeltedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined,
  }
}

function userFromRow(row: any): User {
  return {
    ID: Number.parseInt(row['id']),
    Name: row['name'],
    Room: row['room'],
    Type: row['type'] ? UserType[row['type'] as keyof typeof UserType] : UserType.STUDENT,
    Term: row['term'],
    Status: row['status'] ? UserStatus[row['status'] as keyof typeof UserStatus] : UserStatus.FREE,
    IsActive: row['is_active'] ? new Boolean(row['is_active']).valueOf() : false,
    CreatedAt: row['created_at'] ? new Date(row['created_at']) : undefined,
    UpdatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
    DeletedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined
  }
}

function accountFromRow(row: any): Account {
  return {
    user: {
      id: Number.parseInt(row['id']),
      email: row['email'],
      password: row['password'],
      isActive: row['is_active'] ? new Boolean(row['is_active']).valueOf() : false,
      createdAt: row['created_at'] ? new Date(row['created_at']) : undefined,
      updatedAt: row['updated_at'] ? new Date(row['updated_at']) : undefined,
      deletedAt: row['deleted_at'] ? new Date(row['deleted_at']) : undefined
    }
  }
}

export { bookingFromRow, bikeFromRow, userFromRow, filterPropertiesWithPrefix, accountFromRow }
