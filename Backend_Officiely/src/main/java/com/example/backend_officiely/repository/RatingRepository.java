package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RatingRepository extends JpaRepository<Rating, Long> {
    Rating CreateRating(Rating rating);

    Rating UpdateRatingById(String rating_id, Rating rating);

    Optional<Rating> findByOfficeId(String office_id);

    List<Rating> findByUserId(String user_id);

    List<Rating> getAllRatings();

    void deleteById(String rating_id);

    List<Rating> sortByRating();





}
