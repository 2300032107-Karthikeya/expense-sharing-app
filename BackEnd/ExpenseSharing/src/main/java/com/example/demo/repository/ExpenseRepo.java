package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.model.Expense;
import com.example.demo.model.Group;

import java.util.List;

@Repository
public interface ExpenseRepo extends JpaRepository<Expense, Long> {

    // Find all expenses belonging to a specific group
    List<Expense> findByGroup(Group group);
}
