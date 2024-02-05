package com.example.backend_officiely.service.impl;

import com.example.backend_officiely.dtos.UserDto;
import com.example.backend_officiely.entity.User;
import com.example.backend_officiely.repository.UserRepository;
import com.example.backend_officiely.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDto getDetails() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return UserDto.builder()
                .email(user.getEmail()).firstName(user.getFirstName()).lastName(user.getLastName()).build();
    }
    @Transactional
    @Override
    public Long deleteUser(String Email) {
        return userRepository.deleteByEmail(Email);
    }

    @Override
    public boolean updateUser(UserDto userDto) {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        userRepository.save(user);
        return true;
    }
}
