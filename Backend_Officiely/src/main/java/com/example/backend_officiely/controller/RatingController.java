package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.RatingDto;
import com.example.backend_officiely.dtos.RatingResponse;
import com.example.backend_officiely.service.RatingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
@CrossOrigin(origins = "*")
@Tag(name = "RatingController", description = "This is the Rating Controller for the application. It has all endpoints for the Rating entity.")
public class RatingController {
    private final RatingService ratingService;

    public RatingController(RatingService ratingService) {
        this.ratingService = ratingService;
    }

    @GetMapping("/{OfficeId}")
    @Operation(summary = "getting all ratings by office id", description = "This endpoint is used to get all the ratings in the database by office id. It returns a list of all the ratings. It is accessible to all users.")
    public ResponseEntity<List<RatingResponse>> getRatingById(@PathVariable String OfficeId) {
        return new ResponseEntity<>(ratingService.getRatingByOfficeId(OfficeId), HttpStatus.OK);
    }

    @PostMapping("/{OfficeId}")
    @Operation(summary = "adding a rating", description = "This endpoint is used to add a rating to the database. It takes in a rating object and the office id and returns the added ratingResponse object. It is accessible to all users.")
    public ResponseEntity<?> addRating(@PathVariable String OfficeId, @RequestBody RatingDto ratingDto) {
        return new ResponseEntity<>(ratingService.addRating(OfficeId, ratingDto), HttpStatus.CREATED);
    }

    @PutMapping("/{RatingId}")
    @Operation(summary = "updating a rating", description = "This endpoint is used to update a rating in the database. It takes in a rating object and the rating id and returns the updated ratingResponse object. It is accessible to all users for their ratings.")
    public ResponseEntity<?> updateRating(@PathVariable String RatingId, @RequestBody RatingDto ratingDto) {
        RatingResponse ratingResponse = ratingService.updateRating(RatingId, ratingDto);
        if (ratingResponse == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to update this rating.");
        } else {
            return ResponseEntity.ok(ratingResponse);
        }
    }

    @DeleteMapping("/{RatingId}")
    @Operation(summary = "deleting a rating", description = "This endpoint is used to delete a rating from the database. It takes in the rating id and returns a response entity of rating. It is accessible to all users for their ratings.")
    public ResponseEntity<?> deleteRating(@PathVariable String RatingId) {
        Long ratingResponse = ratingService.deleteRating(RatingId);
        if (ratingResponse == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not allowed to delete this rating or deletion failed.");
        }
        return ResponseEntity.ok(ratingResponse);
    }

    @GetMapping("/my-ratings")
    @Operation(summary = "getting all user ratings", description = "This endpoint is used to get all the ratings in the database that belongs to user. It returns a list of all the ratings. It is accessible to all users for their ratings.")
    public ResponseEntity<?> getRatingByUserId() {
        List<RatingResponse> ratingResponse = ratingService.getRatingByUserId();
        return new ResponseEntity<>(ratingResponse, HttpStatus.OK);
    }


}
