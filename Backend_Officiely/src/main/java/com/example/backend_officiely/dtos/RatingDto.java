package com.example.backend_officiely.dtos;

import com.example.backend_officiely.entity.Office;
import lombok.Builder;
import lombok.Data;
@Builder
@Data
public class RatingDto {
    private double ratingValue;
    private String comment;
}
