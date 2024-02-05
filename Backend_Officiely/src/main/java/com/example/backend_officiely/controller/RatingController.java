package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.RatingDto;
import com.example.backend_officiely.dtos.RatingResponse;
import com.example.backend_officiely.service.RatingService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("/{OfficeId}")
    public ResponseEntity<List<RatingResponse>> getRatingById(@PathVariable String OfficeId){
        return new ResponseEntity<>(ratingService.getRatingByOfficeId(OfficeId), HttpStatus.OK);
    }
    @PostMapping("/{OfficeId}")
    public ResponseEntity<?> addRating(@PathVariable String OfficeId, @RequestBody RatingDto ratingDto){
        return new ResponseEntity<>(ratingService.addRating(OfficeId, ratingDto), HttpStatus.OK);
    }
    @PutMapping("/{RatingId}")
    public ResponseEntity<?> updateRating(@PathVariable String RatingId, @RequestBody RatingDto ratingDto){
        RatingResponse ratingResponse = ratingService.updateRating(RatingId, ratingDto);
        if (ratingResponse == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to update this rating.");
        }
        else {
            return ResponseEntity.ok(ratingResponse);
        }
    }
    @DeleteMapping("/{RatingId}")
    public ResponseEntity<?> deleteRating(@PathVariable String RatingId){
        Long ratingResponse = ratingService.deleteRating(RatingId);
        if (ratingResponse == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this rating or deletion failed.");
        }
        return ResponseEntity.ok(ratingResponse);
    }
    @GetMapping("/my-ratings/{userId}")
    public ResponseEntity<?> getRatingByUserId(@PathVariable String userId){
        List<RatingResponse> ratingResponse = ratingService.getRatingByUserId(userId);
        return new ResponseEntity<>(ratingService.getRatingByUserId(userId), HttpStatus.OK);
    }


}
