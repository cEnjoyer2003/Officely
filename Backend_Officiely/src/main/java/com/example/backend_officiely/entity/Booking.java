package com.example.backend_officiely.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(
        name = "booking",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "booking_id")
        }
)
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String booking_id;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(
            name="StartDateTime",
            nullable = false
    )
    private String StartDateTime;

    @Column(
            name="EndDateTime",
            nullable = false
    )
    private String EndDateTime;

}
