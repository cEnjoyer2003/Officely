package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, String> {


    List<Rating> findByOffice_OfficeId(String OfficeId);


    List<Rating> findByUser_UserId(String userId);

    Rating findByRatingId(String ratingId);

    long deleteByRatingId(String ratingId);
}
