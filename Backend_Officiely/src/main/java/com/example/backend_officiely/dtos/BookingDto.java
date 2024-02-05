package com.example.backend_officiely.dtos;

import com.example.backend_officiely.entity.Office;
import com.example.backend_officiely.entity.User;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class BookingDto {
    private String officeId;
    private String startDateTime;
    private String endDateTime;
}
