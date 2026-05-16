package com.crowdfundx.backend.service;

import com.crowdfundx.backend.model.Campaign;
import com.crowdfundx.backend.model.Donation;
import com.crowdfundx.backend.repository.CampaignRepository;
import com.crowdfundx.backend.repository.DonationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CampaignService {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private DonationRepository donationRepository;

    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    public Optional<Campaign> getCampaignById(String id) {
        return campaignRepository.findById(id);
    }

    public Campaign saveCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(String id) {
        campaignRepository.deleteById(id);
    }

    public List<Campaign> getCampaignsByCategory(String category) {
        return campaignRepository.findByCategory(category);
    }

    public List<Campaign> getCampaignsByStatus(String status) {
        return campaignRepository.findByStatus(status);
    }
    
    public Campaign donateToCampaign(String campaignId, Donation donation) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new RuntimeException("Campaign not found"));
        
        campaign.setRaised(campaign.getRaised() + donation.getAmount());
        campaign.setDonors(campaign.getDonors() + 1);
        
        donation.setCampaign(campaign);
        donationRepository.save(donation);
        
        return campaignRepository.save(campaign);
    }
}
