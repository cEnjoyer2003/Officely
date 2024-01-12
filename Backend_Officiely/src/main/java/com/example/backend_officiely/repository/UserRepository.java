package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long>{
}
