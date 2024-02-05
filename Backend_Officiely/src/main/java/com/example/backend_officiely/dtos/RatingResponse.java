package com.example.backend_officiely.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RatingResponse {
    private String ratingId;
    private String officeName;
    private String userFirstName;
    private String userLastName;
    private double ratingValue;
    private String comment;
}
