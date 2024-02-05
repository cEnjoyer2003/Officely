package com.example.backend_officiely.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookingResponse {
    private String bookingId;
    private OfficeResponse office;
    private UserDto user;
    private String startDateTime;
    private String endDateTime;
}
