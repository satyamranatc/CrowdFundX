package com.crowdfundx.backend.controller;

import com.crowdfundx.backend.model.Campaign;
import com.crowdfundx.backend.model.Donation;
import com.crowdfundx.backend.service.CampaignService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin(origins = "*") // For development convenience
public class CampaignController {

    @Autowired
    private CampaignService campaignService;

    @GetMapping
    public List<Campaign> getAllCampaigns(@RequestParam(required = false) String category, 
                                          @RequestParam(required = false) String status) {
        if (category != null) return campaignService.getCampaignsByCategory(category);
        if (status != null) return campaignService.getCampaignsByStatus(status);
        return campaignService.getAllCampaigns();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(@PathVariable String id) {
        return campaignService.getCampaignById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignService.saveCampaign(campaign);
    }

    @PostMapping("/{id}/donate")
    public Campaign donate(@PathVariable String id, @RequestBody Donation donation) {
        return campaignService.donateToCampaign(id, donation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCampaign(@PathVariable String id) {
        campaignService.deleteCampaign(id);
        return ResponseEntity.ok().build();
    }
}
