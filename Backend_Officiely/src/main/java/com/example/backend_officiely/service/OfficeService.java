package com.example.backend_officiely.service;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.dtos.OfficeResponse;
import com.example.backend_officiely.dtos.SearchParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;


public interface OfficeService {

    List<OfficeResponse> getAllOffices();

    OfficeResponse addOffice(OfficeDto officeDto);

    Long deleteOffice(String id);

    OfficeResponse getOfficeById(String id);

    List<OfficeResponse> searchOfficeByParams(SearchParams searchParams);

    OfficeResponse updateOffice(OfficeDto officeDto, String officeId);

    List<OfficeResponse> searchOfficeByName(String officeName);
}
