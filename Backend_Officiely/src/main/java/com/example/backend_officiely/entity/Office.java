package com.example.backend_officiely.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(
        name = "office",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "office_id")
        }
)
public class Office {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String office_id;
    @Column(
            name = "office_name",
            nullable = false
    )
    private String office_name;
    @Column(
            name = "office_address",
            nullable = false
    )
    private String office_address;
    @Column(
            name = "facilities"
    )
    private String facilities;
    @Column(
            name = "contact_info",
            nullable = false
    )
    private String contact_info;
    @Column(
            name = "rating",
            nullable = false
    )
    private double rating;
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



}
