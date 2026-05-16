package com.crowdfundx.backend.repository;

import com.crowdfundx.backend.model.Donation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface DonationRepository extends JpaRepository<Donation, String> {
    List<Donation> findByCampaignId(String campaignId);
    List<Donation> findByDonorId(String donorId);
}
