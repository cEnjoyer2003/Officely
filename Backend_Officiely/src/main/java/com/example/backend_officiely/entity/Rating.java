package com.example.backend_officiely.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(
        name = "rating",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = "rating_id")
        }
)
public class Rating {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String rating_id;

    @ManyToOne
    @JoinColumn(name = "office_id", nullable = false)
    private Office office;

    @Column(
            name = "rating_value",
            nullable = false
    )
    private double rating_value;

    @Column(
            name = "comment",
            nullable = false
    )
    private String comment;
}
