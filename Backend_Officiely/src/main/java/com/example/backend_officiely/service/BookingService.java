package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.BookingDto;
import com.example.backend_officiely.dtos.BookingResponse;

import java.util.List;

public interface BookingService {

    List<BookingResponse> getAllBookings();

    List<BookingResponse> getBookingsByUserId();

    List<BookingResponse> getBookingsByOfficeId(String officeId);

    long deleteBooking(String bookingId);

    BookingResponse updateBooking(String bookingId, BookingDto bookingDto);

    BookingResponse createBooking(String officeId, BookingDto bookingDto);
}
