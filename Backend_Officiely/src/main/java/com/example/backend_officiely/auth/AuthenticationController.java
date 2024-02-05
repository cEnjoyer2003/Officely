package com.example.backend_officiely.auth;

import com.example.backend_officiely.dtos.LoginDto;
import com.example.backend_officiely.dtos.PasswordChange;
import com.example.backend_officiely.dtos.RegisterDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterDto registerDto){
        return ResponseEntity.ok(authenticationService.register(registerDto));
    }
    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody LoginDto loginDto){
        return ResponseEntity.ok(authenticationService.authenticate(loginDto));
    }
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChange passwordChange){
        if(authenticationService.changePassword(passwordChange)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
