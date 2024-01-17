package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.service.OfficeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/office")
public class OfficeController {
    private OfficeService officeService;

    public OfficeController(OfficeService officeService) {
        this.officeService = officeService;
    }
    @GetMapping
    public ResponseEntity<List<OfficeDto>> getAllOffices(){
        return new ResponseEntity<>(officeService.getAllOffices(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<OfficeDto> addOffice(@RequestBody OfficeDto officeDto){
        return new ResponseEntity<>(officeService.addOffice(officeDto),HttpStatus.CREATED);
    }
    @PutMapping
    public ResponseEntity<OfficeDto> updateOffice(@RequestBody OfficeDto officeDto){
        return new ResponseEntity<>(officeService.addOffice(officeDto),HttpStatus.OK);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteOffice(@PathVariable String id){
        officeService.deleteOffice(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<OfficeDto> getOfficeById(@PathVariable String id){
        return new ResponseEntity<>(officeService.getOfficeById(id),HttpStatus.OK);
    }
}
