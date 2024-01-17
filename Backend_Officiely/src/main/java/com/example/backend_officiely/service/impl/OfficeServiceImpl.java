package com.example.backend_officiely.service.impl;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.entity.Office;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.service.OfficeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OfficeServiceImpl implements OfficeService {
    private OfficeRepository officeRepository;
    @Autowired
    public OfficeServiceImpl(OfficeRepository officeRepository) {
        this.officeRepository = officeRepository;
    }
    @Override
    public List<OfficeDto> getAllOffices() {
         List<Office> offices = officeRepository.findAll();
            return offices.stream().map(this::mapToDto).toList();
    }

    @Override
    public OfficeDto addOffice(OfficeDto officeDto) {
        Office office = mapToEntity(officeDto);
        Office savedOffice = officeRepository.save(office);
        return mapToDto(savedOffice);
    }

    @Override
    public void deleteOffice(String id) {
        officeRepository.deleteById(id);
    }

    @Override
    public OfficeDto getOfficeById(String id) {
        Office office = officeRepository.findById(id).orElseThrow();
        return mapToDto(office);
    }


    private OfficeDto mapToDto(Office office){
        return OfficeDto.builder()
                .office_id(office.getOffice_id()).office_name(office.getOffice_name())
                .office_address(office.getOffice_address()).facilities(office.getFacilities())
                .contact_info(office.getContact_info()).rating(office.getRating())
                .wifi(office.isWifi()).city(office.getCity()).build();
    }
    private Office mapToEntity(OfficeDto officeDto){
        return Office.builder()
                .office_id(officeDto.getOffice_id()).office_name(officeDto.getOffice_name())
                .office_address(officeDto.getOffice_address()).facilities(officeDto.getFacilities())
                .contact_info(officeDto.getContact_info()).rating(officeDto.getRating())
                .wifi(officeDto.isWifi()).city(officeDto.getCity()).build();
    }
}
