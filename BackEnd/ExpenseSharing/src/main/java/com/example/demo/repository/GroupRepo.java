package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.demo.model.Group;

@Repository
public interface GroupRepo extends JpaRepository<Group, Long> {

    // Optional: find group by name
    Group findByName(String name);

    boolean existsByName(String name);
}
