package com.example.backend_officiely.auth;

import com.example.backend_officiely.dtos.LoginDto;
import com.example.backend_officiely.dtos.PasswordChange;
import com.example.backend_officiely.dtos.RegisterDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
@Tag(name = "AuthenticationController", description = "This is the Authentication Controller for the application. It has all endpoints for the Authentication entity.")
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    @Operation(summary = "registering a user", description = "This endpoint is used to register a user in the database. It takes in a register object and returns the authenticationResponse object. It is accessible to all users.")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterDto registerDto) {
        return ResponseEntity.ok(authenticationService.register(registerDto));
    }

    @PostMapping("/authenticate")
    @Operation(summary = "authenticating a user", description = "This endpoint is used to authenticate a user in the database. It takes in a login object and returns the authenticationResponse object. It is accessible to all users.")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginDto loginDto) {
        return ResponseEntity.ok(authenticationService.authenticate(loginDto));
    }

    @PutMapping("/change-password")
    @Operation(summary = "changing password", description = "This endpoint is used to change the password of a user in the database. It takes in a passwordChange object and returns a response entity. It is accessible to all users.")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChange passwordChange) {
        if (authenticationService.changePassword(passwordChange)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
