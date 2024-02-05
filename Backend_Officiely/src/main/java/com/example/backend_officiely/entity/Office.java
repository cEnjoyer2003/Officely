package com.example.backend_officiely.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.net.URL;
import java.util.ArrayList;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(
        name = "office",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "Office_id")
        }
)
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String officeId;
    @Column(
            name = "office_name",
            nullable = false
    )
    private String officeName;
    @Column(
            name = "office_address",
            nullable = false
    )
    private String officeAddress;
    @Column(
            name = "facilities"
    )
    private String facilities;
    @Column(
            name = "contact_info",
            nullable = false
    )
    private String contactInfo;
    @Column(
            name = "price",
            nullable = false
    )
    private double price;
    @Column(
            name = "wifi",
            nullable = false
    )
    private boolean wifi;
    @Column(
            name = "city",
            nullable = false
    )
    private String city;
    @Column(
            name="capacity",
            nullable = false
    )
    private double capacity;
    @Column(
            name = "office_image",
            nullable = false
    )
    private URL officeImage;

}
