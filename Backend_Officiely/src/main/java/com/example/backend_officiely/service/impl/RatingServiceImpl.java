package com.example.backend_officiely.service.impl;

import com.example.backend_officiely.dtos.RatingDto;
import com.example.backend_officiely.dtos.RatingResponse;
import com.example.backend_officiely.entity.Rating;
import com.example.backend_officiely.entity.User;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.repository.RatingRepository;
import com.example.backend_officiely.service.RatingService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RatingServiceImpl implements RatingService {
    private final RatingRepository ratingRepository;
    private final OfficeRepository officeRepository;

    public RatingServiceImpl(RatingRepository ratingRepository, OfficeRepository officeRepository) {
        this.ratingRepository = ratingRepository;
        this.officeRepository = officeRepository;
    }


    @Override
    public List<RatingResponse> getRatingByOfficeId(String officeId) {
        return ratingRepository.findByOffice_OfficeId(officeId).stream().map(this::mapToResponse).toList();
    }

    @Override
    public RatingResponse updateRating(String RatingId, RatingDto ratingDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getUserId().equals(ratingRepository.findByRatingId(RatingId).getUser().getUserId())) {
            Rating rating = mapToEntity(ratingRepository.findByRatingId(RatingId).getOffice().getOfficeId(), ratingDto);
            rating.setRatingId(RatingId);
            return mapToResponse(ratingRepository.save(rating));
        } else {
            return null;
        }
    }

    @Transactional
    @Override
    public Long deleteRating(String RatingId) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (user.getUserId().equals(ratingRepository.findByRatingId(RatingId).getUser().getUserId())) {
            return ratingRepository.deleteByRatingId(RatingId);
        } else {
            return null;
        }
    }

    @Override
    public List<RatingResponse> getRatingByUserId() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ratingRepository.findByUser_UserId(user.getUserId()).stream().map(this::mapToResponse).toList();
    }

    @Override
    public RatingResponse addRating(String officeId, RatingDto ratingDto) {
        return mapToResponse(ratingRepository.save(mapToEntity(officeId, ratingDto)));
    }

    private Rating mapToEntity(String officeId, RatingDto ratingDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return Rating.builder()
                .office(officeRepository.findByOfficeId(officeId))
                .ratingValue(ratingDto.getRatingValue())
                .comment(ratingDto.getComment())
                .user(user)
                .build();
    }

    private RatingResponse mapToResponse(Rating rating) {
        return RatingResponse.builder()
                .ratingId(rating.getRatingId()).officeName(rating.getOffice().getOfficeName())
                .userFirstName(rating.getUser().getFirstName()).userLastName(rating.getUser().getLastName())
                .ratingValue(rating.getRatingValue()).comment(rating.getComment()).build();

    }
}
