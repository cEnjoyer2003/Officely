package com.example.backend_officiely.dtos;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchParams {
    private String city;
    private String startDateTime;
    private String endDateTime;
    private String sortByPrice;
    private double minimumRating;
    private boolean wifi;
    private double minimumPrice;
    private double maximumPrice;
    private double minimumCapacity;
    private double maximumCapacity;
}
