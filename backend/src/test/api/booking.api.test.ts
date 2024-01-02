import request from 'supertest'
import {app, server, db} from '../../index'


describe('API Integration Tests', () => {
  let createdBookingId: number; // To store the ID of a booking created during testing

  // Test Case 1: Create a Single Booking
  it('should create a single booking', async () => {
    const response = await request(app)
      .post('/booking/create/single')
      .send({
        userName: 'user1',
        room: '101',
        bikeSize: 'SMALL',
      })

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('booking')
    createdBookingId = response.body.booking.ID
  });


  it('should approve the opened booking', async() => {
    const response = await request(app)
      .post(`/booking/approve/${createdBookingId}`)
      .send()
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('booking')
  })

  it('should list the opened booking', async() => {
    const response = await request(app)
      .get(`/booking/all`)
      .send()
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('bookings')
    const bookings = response.body.bookings
    expect(bookings).toHaveLength(1)
  })

  it('should return the opened booking', async() => {
    const response = await request(app)
      .post(`/booking/return/${createdBookingId}`)
      .send()
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('booking')
  })


})

afterAll(() => {
  server.close()
  db.end()
})

