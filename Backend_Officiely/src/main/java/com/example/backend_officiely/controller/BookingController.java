package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.BookingDto;
import com.example.backend_officiely.dtos.BookingResponse;
import com.example.backend_officiely.service.BookingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
@CrossOrigin(origins = "*")
@Tag(name = "BookingController", description = "This is the Booking Controller for the application. It has all endpoints for the Booking entity.")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @GetMapping("/all-bookings")
    @Operation(summary = "getting all bookings", description = "This endpoint is used to get all the bookings in the database. It returns a list of all the bookings. It is accessible to admin.")
    public ResponseEntity<List<BookingResponse>> getAllBookings() {
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }

    @GetMapping("/my-bookings")
    @Operation(summary = "getting all bookings", description = "This endpoint is used to get all the bookings in the database. It returns a list of all the bookings that belong to user. It is accessible to the all users.")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserId() {
        return new ResponseEntity<>(bookingService.getBookingsByUserId(), HttpStatus.OK);
    }

    @GetMapping("/{officeId}")
    @Operation(summary = "getting all bookings by office id", description = "This endpoint is used to get all the bookings in the database by office id. It returns a list of all the bookings. It is accessible to admin.")
    public ResponseEntity<List<BookingResponse>> getBookingsByOfficeId(@PathVariable String officeId) {
        return new ResponseEntity<>(bookingService.getBookingsByOfficeId(officeId), HttpStatus.OK);
    }

    @PostMapping("/{officeId}")
    @Operation(summary = "creating a booking", description = "This endpoint is used to create a booking in the database. It takes in a booking object and the office id and returns the added bookingResponse object. It is accessible to all users.")
    public ResponseEntity<BookingResponse> createBooking(@PathVariable String officeId, @RequestBody BookingDto bookingDto) {
        BookingResponse bookingResponse = bookingService.createBooking(officeId, bookingDto);
        if (bookingResponse == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(bookingResponse, HttpStatus.CREATED);
        }
    }

    @Operation(summary = "deleting a booking", description = "This endpoint is used to delete a booking from the database. It takes in the booking id and returns a response entity of booking. It is accessible to actual user for their bookings and to admin for all bookings.")
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String bookingId) {
        if (bookingService.deleteBooking(bookingId) == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @Operation(summary = "updating a booking", description = "This endpoint is used to update a booking in the database. It takes in a booking object and the booking id and returns the updated bookingResponse object. It is accessible to all users for their bookings")
    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> updateBooking(@PathVariable String bookingId, @RequestBody BookingDto bookingDto) {
        BookingResponse bookingResponse = bookingService.updateBooking(bookingId, bookingDto);
        if (bookingResponse == null) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        } else {
            return new ResponseEntity<>(bookingResponse, HttpStatus.OK);
        }
    }

    @GetMapping("/offices/{officeName}")
    @Operation(summary = "getting all bookings by office name", description = "This endpoint is used to get all the bookings in the database by office name. It returns a list of all the bookings. It is accessible to admin.")
    public ResponseEntity<List<BookingResponse>> getBookingsByOfficeName(@PathVariable String officeName) {
        return new ResponseEntity<>(bookingService.getBookingsByOfficeName(officeName), HttpStatus.OK);
    }

}
