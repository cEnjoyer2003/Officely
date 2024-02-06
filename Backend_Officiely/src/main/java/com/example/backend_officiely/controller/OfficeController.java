package com.example.backend_officiely.controller;

import com.example.backend_officiely.dtos.OfficeDto;
import com.example.backend_officiely.dtos.OfficeResponse;
import com.example.backend_officiely.dtos.SearchParams;
import com.example.backend_officiely.repository.OfficeRepository;
import com.example.backend_officiely.service.OfficeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/office")
@CrossOrigin(origins = "*")
@Tag(name = "OfficeController", description = "This is the Office Controller for the application. It has all endpoints for the Office entity.")
public class OfficeController {
    private final OfficeService officeService;
    private final OfficeRepository officeRepository;

    public OfficeController(OfficeService officeService,
                            OfficeRepository officeRepository) {
        this.officeService = officeService;
        this.officeRepository = officeRepository;
    }

    @GetMapping
    @Operation(summary = "getting all offices", description = "This endpoint is used to get all the offices in the database. It returns a list of all the offices. It is accessible to all users.")
    public ResponseEntity<List<OfficeResponse>> getAllOffices() {
        List<OfficeResponse> officeResponses = officeService.getAllOffices();
        if (officeResponses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(officeService.getAllOffices(), HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "adding an office", description = "This endpoint is used to add an office to the database. It takes in an office object and returns the added officeResponse object. It is accessible only to admin.")
    public ResponseEntity<OfficeResponse> addOffice(@RequestBody OfficeDto officeDto) {
        OfficeResponse officeResponse = officeService.addOffice(officeDto);
        if (officeResponse == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(officeService.addOffice(officeDto), HttpStatus.CREATED);
    }

    @PutMapping("/{officeId}")
    @Operation(summary = "updating an office", description = "This endpoint is used to update an office in the database. It takes in an office object and the office id and returns the updated officeResponse object. It is accessible only to admin.")
    public ResponseEntity<OfficeResponse> updateOffice(@RequestBody OfficeDto officeDto, @PathVariable String officeId) {
        OfficeResponse officeResponse = officeService.updateOffice(officeDto, officeId);
        if (officeResponse == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(officeService.updateOffice(officeDto, officeId), HttpStatus.OK);
    }

    @DeleteMapping("/{officeId}")
    @Operation(summary = "deleting an office", description = "This endpoint is used to delete an office from the database. It takes in the office id and returns a response entity of office. It is accessible only to admin.")
    public ResponseEntity<?> deleteOffice(@PathVariable String officeId) {
        if (officeService.deleteOffice(officeId) > 0) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/{id}")
    @Operation(summary = "getting an office by id", description = "This endpoint is used to get an office by its id. It takes in the office id and returns the officeResponse object. It is accessible to all users.")
    public ResponseEntity<OfficeResponse> getOfficeById(@PathVariable String id) {
        OfficeResponse officeResponse = officeService.getOfficeById(id);
        if (officeResponse == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(officeService.getOfficeById(id), HttpStatus.OK);
    }

    @PostMapping("/search")
    @Operation(summary = "searching for an office by parameters", description = "This endpoint is used to search for an office by its parameters. It takes in the search parameters and returns a list of officeResponse objects. It is accessible to all users.")
    public ResponseEntity<List<OfficeResponse>> searchOffice(@RequestBody SearchParams searchParams) {
        List<OfficeResponse> officeResponses = officeService.searchOfficeByParams(searchParams);
        if (officeResponses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(officeService.searchOfficeByParams(searchParams), HttpStatus.OK);
    }

    @GetMapping("/searchByOfficeName/{officeName}")
    @Operation(summary = "searching for an office by name", description = "This endpoint is used to search for an office by its name. It takes in the office name and returns a list of officeResponse objects. It is accessible to all users.")
    public ResponseEntity<List<OfficeResponse>> searchOfficeByName(@PathVariable String officeName) {
        List<OfficeResponse> officeResponses = officeService.searchOfficeByName(officeName);
        if (officeResponses.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(officeService.searchOfficeByName(officeName), HttpStatus.OK);
    }


}
