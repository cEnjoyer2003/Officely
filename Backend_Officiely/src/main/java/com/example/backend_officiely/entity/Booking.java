package com.example.backend_officiely.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
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
    private String bookingId;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(
            name = "StartDateTime",
            nullable = false
    )
    private String startDateTime;

    @Column(
            name = "EndDateTime",
            nullable = false
    )
    private String endDateTime;
    @Column(
            name = "origin",
            nullable = true
    )
    private String origin;

}
