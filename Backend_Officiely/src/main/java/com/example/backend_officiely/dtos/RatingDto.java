package com.example.backend_officiely.dtos;

import com.example.backend_officiely.entity.Office;
import lombok.Data;

@Data
public class RatingDto {
    private String rating_id;
    private Office office;
    private double rating_value;

    private String comment;
}
