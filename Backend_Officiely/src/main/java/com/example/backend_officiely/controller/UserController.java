package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.UserDto;
import com.example.backend_officiely.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
@Tag(name = "UserController", description = "This is the User Controller for the application. It has all endpoints for the User entity.")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    @Operation(summary = "getting user details", description = "This endpoint is used to get the details of the user. It returns the user details. It is accessible to all users.")
    public ResponseEntity<UserDto> getDetails() {
        return new ResponseEntity<>(userService.getDetails(), HttpStatus.OK);
    }

    @GetMapping("/email-search/{email}")
    @Operation(summary = "getting user by email", description = "This endpoint is used to get the user by email. It returns the user details. It is accessible to admin.")
    public ResponseEntity<UserDto> getUserByEmail(@PathVariable String email) {
        UserDto userDto = userService.getUserByEmail(email);
        if (userDto == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.getUserByEmail(email), HttpStatus.OK);
    }

    @DeleteMapping("/delete-admin/{email}")
    @Operation(summary = "deleting a user by email", description = "This endpoint is used to delete a user from the database. It takes in the email and returns a response entity of user. It is accessible to admin.")
    public ResponseEntity<?> deleteUser(@PathVariable String email) {
        if (email == null || email.isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if (userService.deleteUser(email) == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @DeleteMapping("/delete-my-account")
    @Operation(summary = "deleting my account", description = "This endpoint is used to delete the user from the database. It returns a response entity of user. It is accessible to all users.")
    public ResponseEntity<?> deleteMyAccount() {
        UserDto userDto = userService.getDetails();
        if (userService.deleteUser(userDto.getEmail()) == 0) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @PutMapping("/update")
    @Operation(summary = "updating user details", description = "This endpoint is used to update the user details in the database. It takes in a user object and returns the updated userResponse object. It is accessible to all users.")
    public ResponseEntity<UserDto> updateUser(@RequestBody UserDto userDto) {
        UserDto userDto1 = userService.updateUser(userDto);
        if (userDto1 == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(userService.updateUser(userDto), HttpStatus.OK);
    }

    @GetMapping("/all-users")
    @Operation(summary = "getting all users", description = "This endpoint is used to get all the users in the database. It returns a list of all the users. It is accessible to admin.")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userService.getAllUsers(), HttpStatus.OK);
    }

}
