package com.example.backend_officiely.dtos;

import com.example.backend_officiely.entity.Office;
import com.example.backend_officiely.entity.User;
import lombok.Data;

@Data
public class BookingDto {
    private Office office;
    private User user;
    private String StartDateTime;
    private String EndDateTime;
}
