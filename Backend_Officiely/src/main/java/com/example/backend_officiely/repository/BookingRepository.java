package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, String> {

    List<Booking> findByOffice_OfficeId(String OfficeId);


    List<Booking> findByUser_UserId(String UserId);

    Booking findByBookingId(String bookingId);

    long deleteByBookingId(String bookingId);

    List<Booking> findByOffice_OfficeName(String officeName);

}
