package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.RatingDto;
import com.example.backend_officiely.dtos.RatingResponse;

import java.util.List;

public interface RatingService {
    List<RatingResponse> getRatingByOfficeId(String officeId);

    RatingResponse updateRating(String officeId, RatingDto ratingDto);

    Long deleteRating(String officeId);

    List<RatingResponse> getRatingByUserId(String userId);

    RatingResponse addRating(String officeId, RatingDto ratingDto);
}
