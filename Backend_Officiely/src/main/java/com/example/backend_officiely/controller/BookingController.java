package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.BookingDto;
import com.example.backend_officiely.dtos.BookingResponse;
import com.example.backend_officiely.service.BookingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/booking")
public class BookingController {
    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }
    @GetMapping
    public ResponseEntity<List<BookingResponse>> getAllBookings(){
        return new ResponseEntity<>(bookingService.getAllBookings(), HttpStatus.OK);
    }
    @GetMapping("/my-bookings")
    public ResponseEntity<List<BookingResponse>> getBookingsByUserId(){
        return new ResponseEntity<>(bookingService.getBookingsByUserId(), HttpStatus.OK);
    }
    @GetMapping("/{officeId}")
    public ResponseEntity<List<BookingResponse>> getBookingsByOfficeId(@PathVariable String officeId){
        return new ResponseEntity<>(bookingService.getBookingsByOfficeId(officeId), HttpStatus.OK);
    }
    @PostMapping("/{officeId}")
    public ResponseEntity<BookingResponse> createBooking(@PathVariable String officeId, @RequestBody BookingDto bookingDto){
        BookingResponse bookingResponse = bookingService.createBooking(officeId, bookingDto);
        if(bookingResponse == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>(bookingResponse, HttpStatus.CREATED);
        }
    }
    @DeleteMapping("/{bookingId}")
    public ResponseEntity<Void> deleteBooking(@PathVariable String bookingId){
        if(bookingService.deleteBooking(bookingId) == 0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
    @PutMapping("/{bookingId}")
    public ResponseEntity<BookingResponse> updateBooking(@PathVariable String bookingId, @RequestBody BookingDto bookingDto){
        BookingResponse bookingResponse = bookingService.updateBooking(bookingId, bookingDto);
        if(bookingResponse == null){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        else{
            return new ResponseEntity<>(bookingResponse, HttpStatus.OK);
        }
    }

}
