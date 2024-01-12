package com.example.backend_officiely.dtos;

import lombok.Data;

@Data
public class OfficeDto {
    private String office_id;
    private String office_name;
    private String office_address;
    private String facilities;

    private String contact_info;

    private double rating;

    private double price;

    private boolean wifi;

    private String city;
}
