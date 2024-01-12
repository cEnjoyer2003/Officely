package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long>{
    Booking CreateBooking(Booking booking);

    Booking UpdateBooking(String booking_id, Booking booking);

    List<Booking> getAllBookings();

    List<Booking> findByOfficeId(String office_id);

    List<Booking> findByUserId(String user_id);

    Optional<Booking> findById(String booking_id);

    void deleteById(String booking_id);






}
