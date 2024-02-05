package com.example.backend_officiely;

import com.example.backend_officiely.auth.AuthenticationService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import static com.example.backend_officiely.entity.Role.ADMIN;

@SpringBootApplication
public class BackendOfficielyApplication {

	public static void main(String[] args) {
		SpringApplication.run(BackendOfficielyApplication.class, args);
	}
}
