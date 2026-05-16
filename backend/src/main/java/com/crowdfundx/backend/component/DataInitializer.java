package com.crowdfundx.backend.component;

import com.crowdfundx.backend.model.Campaign;
import com.crowdfundx.backend.model.Update;
import com.crowdfundx.backend.model.User;
import com.crowdfundx.backend.repository.CampaignRepository;
import com.crowdfundx.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CampaignRepository campaignRepository;

    @Override
    public void run(String... args) throws Exception {
        // Seed Users
        User u1 = User.builder().id("u1").name("Anil Kumar").email("anil@example.com").role("USER").build();
        User u2 = User.builder().id("u2").name("NGO Hope Foundation").email("hope@ngo.org").role("USER").build();
        User u3 = User.builder().id("u3").name("Priya Singh").email("priya@example.com").role("USER").build();
        User admin = User.builder().id("admin_1").name("Admin User").email("admin@crowdfundx.com").role("ADMIN").build();

        userRepository.saveAll(List.of(u1, u2, u3, admin));

        // Seed Campaigns
        Campaign c1 = Campaign.builder()
                .id("1")
                .title("Help Ramesh Fight Cancer")
                .description("Ramesh is a 35-year-old father of two recently diagnosed with Stage 3 Lymphoma...")
                .goal(500000.0)
                .raised(275000.0)
                .donors(120)
                .category("Medical")
                .status("Active")
                .creator(u1)
                .image("https://images.unsplash.com/photo-1538356111053-748a48e1acb8?auto=format&fit=crop&q=80&w=1000")
                .createdAt(LocalDateTime.now().minusDays(5))
                .updates(new ArrayList<>(List.of(
                        Update.builder().text("Ramesh has completed his first round of chemo!").date(LocalDateTime.now().minusDays(1)).build()
                )))
                .build();

        Campaign c2 = Campaign.builder()
                .id("2")
                .title("Rebuild Kerala: Flood Relief Fund")
                .description("Recent floods have devastated numerous villages in Kerala...")
                .goal(2000000.0)
                .raised(1540000.0)
                .donors(850)
                .category("Disaster Relief")
                .status("Active")
                .creator(u2)
                .image("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1000")
                .createdAt(LocalDateTime.now().minusDays(10))
                .updates(new ArrayList<>())
                .build();

        campaignRepository.saveAll(List.of(c1, c2));
        
        System.out.println("Database seeded with initial data.");
    }
}
