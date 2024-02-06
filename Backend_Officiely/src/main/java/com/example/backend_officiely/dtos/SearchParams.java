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
    @Builder.Default
    private double minimumRating=0;
    private boolean wifi;
    @Builder.Default
    private double minimumPrice = 0;
    @Builder.Default
    private double maximumPrice=100000000;
    @Builder.Default
    private double minimumCapacity=0;
    @Builder.Default
    private double maximumCapacity=100000000;
}
