package com.crowdfundx.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "campaigns")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Campaign {
    @Id
    private String id;
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    private Double goal;
    private Double raised;
    private Integer donors;
    private String category;
    private String status; // Active, Completed, Pending
    private String image;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "creator_id")
    private User creator;

    @OneToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "campaign_id")
    private List<Update> updates;
}
