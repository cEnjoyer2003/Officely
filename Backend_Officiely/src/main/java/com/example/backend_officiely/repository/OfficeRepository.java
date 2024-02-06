package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeRepository extends JpaRepository<Office, String> {


    Office findByOfficeId(String OfficeId);

    List<Office> findByPriceGreaterThanEqualAndPriceLessThanEqualAndCapacityLessThanEqualAndCapacityGreaterThanEqual(double minimumPrice, double maximumPrice, double maximumCapacity, double minimumCapacity);

    long deleteByOfficeId(String officeId);

    List<Office> findByOfficeNameContains(String officeName);
}
