package com.example.demo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.Expense;
import com.example.demo.model.Group;
import com.example.demo.model.User;
import com.example.demo.repository.ExpenseRepo;
import com.example.demo.repository.GroupRepo;
import com.example.demo.repository.UserRepo;

@Service
public class ExpenseService {

    @Autowired
    private ExpenseRepo expenseRepository;

    @Autowired
    private GroupRepo groupRepository;

    @Autowired
    private UserRepo userRepository;

    // ==============================
    // Add a new expense
    // ==============================
    public Expense addExpense(String title, String description, double amount, Long paidByUserId, Long groupId) throws Exception {
        Optional<User> userOpt = userRepository.findById(paidByUserId);
        Optional<Group> groupOpt = groupRepository.findById(groupId);

        if (!userOpt.isPresent()) {
            throw new Exception("User not found");
        }
        if (!groupOpt.isPresent()) {
            throw new Exception("Group not found");
        }

        Expense expense = new Expense(title, description, amount, userOpt.get(), groupOpt.get());
        return expenseRepository.save(expense);
    }

    // ==============================
    // Get all expenses
    // ==============================
    public List<Expense> getAllExpenses() {
        return expenseRepository.findAll();
    }

    // ==============================
    // Get expenses for a specific group
    // ==============================
    public List<Expense> getExpensesByGroup(Long groupId) throws Exception {
        Group group = groupRepository.findById(groupId)
                .orElseThrow(() -> new Exception("Group not found with ID: " + groupId));
        return expenseRepository.findByGroup(group);
    }

    // ==============================
    // Get expense by ID
    // ==============================
    public Expense getExpenseById(Long expenseId) throws Exception {
        return expenseRepository.findById(expenseId)
                .orElseThrow(() -> new Exception("Expense not found with ID: " + expenseId));
    }
}
