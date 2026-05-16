package com.crowdfundx.backend.repository;

import com.crowdfundx.backend.model.Update;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UpdateRepository extends JpaRepository<Update, String> {
}
