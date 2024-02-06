package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, String> {
    Optional<User> findByEmail(String email);

    long deleteByEmail(String email);
}
