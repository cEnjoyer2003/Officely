package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.UserDto;
import org.springframework.stereotype.Service;

import java.util.List;


public interface UserService {

    UserDto getDetails();

    Long deleteUser(String userId);

    UserDto updateUser(UserDto userDto);

    UserDto getUserByEmail(String email);

    List<UserDto> getAllUsers();
}
