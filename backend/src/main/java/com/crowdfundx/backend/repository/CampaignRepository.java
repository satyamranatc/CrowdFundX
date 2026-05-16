package com.crowdfundx.backend.repository;

import com.crowdfundx.backend.model.Campaign;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CampaignRepository extends JpaRepository<Campaign, String> {
    List<Campaign> findByCategory(String category);
    List<Campaign> findByStatus(String status);
}
