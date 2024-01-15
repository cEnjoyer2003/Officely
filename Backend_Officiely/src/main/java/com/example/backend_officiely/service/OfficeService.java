package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.OfficeDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OfficeService {

    List<OfficeDto> getAllOffices();

    OfficeDto addOffice(OfficeDto officeDto);

    void deleteOffice(String id);

    OfficeDto getOfficeById(String id);
}
