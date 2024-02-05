package com.example.backend_officiely.dtos;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserDto {
    private String email;
    private String firstName;
    private String lastName;
}
