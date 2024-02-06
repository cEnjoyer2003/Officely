package com.example.backend_officiely.service.impl;

import com.example.backend_officiely.config.JwtService;
import com.example.backend_officiely.dtos.*;
import com.example.backend_officiely.entity.Booking;
import com.example.backend_officiely.entity.Office;
import com.example.backend_officiely.entity.Role;
import com.example.backend_officiely.entity.User;
import com.example.backend_officiely.repository.BookingRepository;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.repository.RatingRepository;
import com.example.backend_officiely.repository.UserRepository;
import com.example.backend_officiely.service.BookingService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    private final BookingRepository bookingRepository;
    private final OfficeRepository officeRepository;
    private final RatingRepository ratingRepository;

    public BookingServiceImpl(BookingRepository bookingRepository, UserRepository userRepository, UserDetailsService userDetailsService, JwtService jwtService, OfficeRepository officeRepository,
                              RatingRepository ratingRepository) {
        this.bookingRepository = bookingRepository;
        this.officeRepository = officeRepository;
        this.ratingRepository = ratingRepository;
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll().stream().map(this::mapToResponse).toList();
    }

    @Override
    public List<BookingResponse> getBookingsByUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return bookingRepository.findByUser_UserId(user.getUserId()).stream().map(this::mapToResponse).toList();
    }

    @Override
    public List<BookingResponse> getBookingsByOfficeId(String officeId) {
        return bookingRepository.findByOffice_OfficeId(officeId).stream().map(this::mapToResponse).toList();
    }

    @Transactional
    @Override
    public long deleteBooking(String bookingId) {
        Booking booking = bookingRepository.findByBookingId(bookingId);
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getRole() == Role.ADMIN) {
            return bookingRepository.deleteByBookingId(bookingId);
        } else {
            if (booking.getUser().getUserId().equals(user.getUserId())) {
                return bookingRepository.deleteByBookingId(bookingId);
            } else {
                return 0;
            }
        }
    }

    @Override
    public BookingResponse updateBooking(String bookingId, BookingDto bookingDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Booking bookingold = bookingRepository.findByBookingId(bookingId);
        if (!bookingold.getUser().getUserId().equals(user.getUserId())) {
            return null;
        }
        Booking booking = mapToEntity(bookingDto);
        booking.setBookingId(bookingId);
        if (!isOfficeAvailable(booking.getOffice(), booking.getStartDateTime(), booking.getEndDateTime())) {
            return null;
        }
        booking.setOffice(officeRepository.findByOfficeId(bookingDto.getOfficeId()));
        booking.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        bookingRepository.save(booking);
        return mapToResponse(bookingRepository.findByBookingId(bookingId));
    }

    @Override
    public BookingResponse createBooking(String officeId, BookingDto bookingDto) {
        Office office = officeRepository.findByOfficeId(officeId);
        if (isOfficeAvailable(office, bookingDto.getStartDateTime(), bookingDto.getEndDateTime())) {
            Booking booking = mapToEntity(bookingDto);
            booking.setOffice(office);
            booking.setUser((User) SecurityContextHolder.getContext().getAuthentication().getPrincipal());
            Booking savedBooking = bookingRepository.save(booking);
            return mapToResponse(savedBooking);
        }
        return null;
    }

    @Override
    public List<BookingResponse> getBookingsByOfficeName(String officeName) {
        return bookingRepository.findByOffice_OfficeName(officeName).stream().map(this::mapToResponse).toList();
    }

    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .bookingId(booking.getBookingId())
                .office(mapToResponse(booking.getOffice()))
                .user(mapToDto(booking.getUser()))
                .startDateTime(booking.getStartDateTime())
                .endDateTime(booking.getEndDateTime())
                .officeImage(booking.getOffice().getOfficeImage())
                .origin(booking.getOrigin())
                .build();
    }

    private Booking mapToEntity(BookingDto bookingDto) {
        return Booking.builder()
                .office(officeRepository.findByOfficeId(bookingDto.getOfficeId()))
                .startDateTime(bookingDto.getStartDateTime())
                .endDateTime(bookingDto.getEndDateTime())
                .origin(bookingDto.getOrigin())
                .build();
    }

    public UserDto mapToDto(User user) {
        return UserDto.builder()
                .email(user.getEmail())
                .lastName(user.getLastName())
                .firstName(user.getFirstName()).build();
    }

    private OfficeResponse mapToResponse(Office office) {
        return OfficeResponse.builder()
                .officeId(office.getOfficeId())
                .officeName(office.getOfficeName())
                .officeAddress(office.getOfficeAddress()).facilities(office.getFacilities())
                .contactInfo(office.getContactInfo()).price(office.getPrice())
                .wifi(office.isWifi()).city(office.getCity()).capacity(office.getCapacity()).image(office.getOfficeImage()).build();
    }

    private Office mapToEntity(OfficeDto officeDto) {
        return Office.builder()
                .officeName(officeDto.getOfficeName())
                .officeAddress(officeDto.getOfficeAddress()).facilities(officeDto.getFacilities())
                .contactInfo(officeDto.getContactInfo()).price(officeDto.getPrice())
                .wifi(officeDto.isWifi()).city(officeDto.getCity()).capacity(officeDto.getCapacity()).officeImage(officeDto.getImage()).build();
    }

    private boolean isOfficeAvailable(Office office, String startDate, String endDate) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        LocalDateTime officeStart = LocalDateTime.parse(startDate, formatter);
        LocalDateTime officeEnd = LocalDateTime.parse(endDate, formatter);
        List<Booking> bookings = bookingRepository.findByOffice_OfficeId(office.getOfficeId());
        if (bookings.isEmpty()) {
            return true;
        }
        for (Booking booking : bookings) {
            LocalDateTime bookingStart = LocalDateTime.parse(booking.getStartDateTime(), formatter);
            LocalDateTime bookingEnd = LocalDateTime.parse(booking.getEndDateTime(), formatter);
            if ((officeEnd.isAfter(bookingStart) && officeStart.isBefore(bookingEnd)) || (officeStart.isBefore(bookingEnd) && officeEnd.isAfter(bookingStart))) {
                return false;
            }
        }
        return true;
    }

}
