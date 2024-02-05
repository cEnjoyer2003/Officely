package com.example.backend_officiely.dtos;

import lombok.Builder;
import lombok.Data;

import java.net.URL;
@Data
@Builder
public class OfficeResponse {
    private String officeId;
    private String officeName;
    private String officeAddress;
    private String facilities;

    private String contactInfo;

    private double price;

    private boolean wifi;

    private String city;
    private double capacity;
    private URL image;
}
