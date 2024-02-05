package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.dtos.OfficeResponse;
import com.example.backend_officiely.dtos.SearchParams;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.service.OfficeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/office")
public class OfficeController {
    private final OfficeService officeService;
    private final OfficeRepository officeRepository;

    public OfficeController(OfficeService officeService,
                            OfficeRepository officeRepository) {
        this.officeService = officeService;
        this.officeRepository = officeRepository;
    }
    @GetMapping
    public ResponseEntity<List<OfficeResponse>> getAllOffices(){
        return new ResponseEntity<>(officeService.getAllOffices(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<OfficeResponse> addOffice(@RequestBody OfficeDto officeDto){
        return new ResponseEntity<>(officeService.addOffice(officeDto),HttpStatus.CREATED);
    }
    @PutMapping("/{officeId}")
    public ResponseEntity<OfficeResponse> updateOffice(@RequestBody OfficeDto officeDto , @PathVariable String officeId){
        return new ResponseEntity<>(officeService.updateOffice(officeDto , officeId),HttpStatus.OK);
    }
    @DeleteMapping("/{officeId}")
    public ResponseEntity<?> deleteOffice(@PathVariable String officeId){
        if(officeService.deleteOffice(officeId)>0){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @GetMapping("/{id}")
    public ResponseEntity<OfficeResponse> getOfficeById(@PathVariable String id){
        return new ResponseEntity<>(officeService.getOfficeById(id),HttpStatus.OK);
    }
    @GetMapping("/search")
    public ResponseEntity<List<OfficeResponse>> searchOffice(@RequestBody SearchParams searchParams){
        return new ResponseEntity<>(officeService.searchOfficeByParams(searchParams) , HttpStatus.OK);
    }

}
