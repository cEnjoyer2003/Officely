package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.UserDto;
import org.springframework.stereotype.Service;


public interface UserService {

    UserDto getDetails();

    Long deleteUser(String userId);

    boolean updateUser(UserDto userDto);
}
