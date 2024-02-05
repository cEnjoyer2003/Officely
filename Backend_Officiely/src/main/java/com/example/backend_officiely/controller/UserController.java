package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.UserDto;
import com.example.backend_officiely.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/details")
    public ResponseEntity<UserDto> getDetails() {
        return new ResponseEntity<>(userService.getDetails(), HttpStatus.OK);
    }

    @DeleteMapping("/delete-admin")
    public ResponseEntity<?> deleteUser(@RequestParam String email) {
        if(email == null || email.isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(userService.deleteUser(email)==0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
    @DeleteMapping("/delete-my-account")
    public ResponseEntity<?> deleteMyAccount() {
        UserDto userDto = userService.getDetails();
        if(userService.deleteUser(userDto.getEmail())==0){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }
    @PutMapping("/update")
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        if(userDto.getEmail() == null || userDto.getEmail().isEmpty())
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        if(!userService.updateUser(userDto)){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        else{
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

}
