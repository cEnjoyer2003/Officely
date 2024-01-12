package com.example.backend_officiely.repository;

import com.example.backend_officiely.entity.Office;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OfficeRepository extends JpaRepository<Office, Long> {
    Office CreateOffice(Office office);
    void deleteById(String office_id);
    List<Office> getAllOffices();
    Office UpdateOffice(String office_id, Office office);
    List<Office> findByCity(String city);
List<Office> findByCityAnd

}
