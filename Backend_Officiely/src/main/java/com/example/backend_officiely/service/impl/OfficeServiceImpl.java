package com.example.backend_officiely.service.impl;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.dtos.OfficeResponse;
import com.example.backend_officiely.dtos.SearchParams;
import com.example.backend_officiely.entity.Booking;
import com.example.backend_officiely.entity.Office;
import com.example.backend_officiely.entity.Rating;
import com.example.backend_officiely.repository.BookingRepository;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.repository.RatingRepository;
import com.example.backend_officiely.service.OfficeService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class OfficeServiceImpl implements OfficeService {
    private final OfficeRepository officeRepository;
    private final BookingRepository bookingRepository;
    private final RatingRepository ratingRepository;
    @Autowired
    public OfficeServiceImpl(OfficeRepository officeRepository , BookingRepository bookingRepository, RatingRepository ratingRepository) {
        this.bookingRepository= bookingRepository;
        this.officeRepository = officeRepository;
        this.ratingRepository = ratingRepository;
    }
    @Override
    public List<OfficeResponse> getAllOffices() {
         List<Office> offices = officeRepository.findAll();
            return offices.stream().map(this::mapToResponse).toList();
    }

    @Override
    public OfficeResponse addOffice(OfficeDto officeDto) {
        Office office = mapToEntity(officeDto);
        Office savedOffice = officeRepository.save(office);
        return mapToResponse(savedOffice);
    }
    @Transactional
    @Override
    public Long deleteOffice(String id) {
        return officeRepository.deleteByOfficeId(id);
    }

    @Override
    public OfficeResponse getOfficeById(String id) {
        Office office = officeRepository.findByOfficeId(id);
        return mapToResponse(office);
    }

    @Override
    public List<OfficeResponse> searchOfficeByParams(SearchParams searchParams) {
       List<Office> offices = officeRepository.findByPriceGreaterThanEqualAndPriceLessThanEqualAndCapacityLessThanEqualAndCapacityGreaterThanEqual(searchParams.getMinimumPrice(),searchParams.getMaximumPrice(),searchParams.getMaximumCapacity(),searchParams.getMinimumCapacity());
       if(searchParams.getCity()!=null){
           offices = offices.stream().filter(office -> office.getCity().equals(searchParams.getCity())).toList();
       }
       if(searchParams.isWifi()){
           offices = offices.stream().filter(office -> office.isWifi()==searchParams.isWifi()).toList();
       }
       offices = offices.stream().filter(office -> isOfficeAvailable(office,searchParams.getStartDateTime(),searchParams.getEndDateTime())).toList();
       offices = offices.stream().filter(office -> ratingRepository.findByOffice_OfficeId(office.getOfficeId()).stream().mapToDouble(Rating::getRatingValue).average().orElse(0)>=searchParams.getMinimumRating()).toList();
       if(searchParams.getSortByPrice()!=null){
           if(searchParams.getSortByPrice().equals("asc")){
               offices.sort((o1, o2) -> (int) (o1.getPrice()-o2.getPrice()));
           }
           else if(searchParams.getSortByPrice().equals("desc")){
               offices.sort((o1, o2) -> (int) (o2.getPrice()-o1.getPrice()));
           }
       }
        return offices.stream().map(this::mapToResponse).toList();
    }

    @Override
    public OfficeResponse updateOffice(OfficeDto officeDto, String officeId) {
        Office office = mapToEntity(officeDto);
        office.setOfficeId(officeId);
        Office savedOffice = officeRepository.save(office);
        return mapToResponse(savedOffice);
    }


    private OfficeResponse mapToResponse(Office office){
        return OfficeResponse.builder()
                .officeId(office.getOfficeId())
                .officeName(office.getOfficeName())
                .officeAddress(office.getOfficeAddress()).facilities(office.getFacilities())
                .contactInfo(office.getContactInfo()).price(office.getPrice())
                .wifi(office.isWifi()).city(office.getCity()).capacity(office.getCapacity()).image(office.getOfficeImage()).build();
    }
    private Office mapToEntity(OfficeDto officeDto){
        return Office.builder()
                .officeName(officeDto.getOfficeName())
                .officeAddress(officeDto.getOfficeAddress()).facilities(officeDto.getFacilities())
                .contactInfo(officeDto.getContactInfo()).price(officeDto.getPrice())
                .wifi(officeDto.isWifi()).city(officeDto.getCity()).capacity(officeDto.getCapacity()).officeImage(officeDto.getImage()).build();
    }
    private boolean isOfficeAvailable(Office office , String startDate , String endDate) {
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
            if((officeEnd.isAfter(bookingStart) && officeStart.isBefore(bookingEnd)) || (officeStart.isBefore(bookingEnd) && officeEnd.isAfter(bookingStart))){
                return false;
            }
        }
        return true;
    }
}
