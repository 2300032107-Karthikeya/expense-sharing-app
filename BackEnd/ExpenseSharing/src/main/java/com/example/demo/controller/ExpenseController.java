package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.Expense;
import com.example.demo.service.ExpenseService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/expenses")
public class ExpenseController {

    @Autowired
    private ExpenseService expenseService;

    // ==============================
    // ✅ Add a new expense
    // ==============================
    @PostMapping
    public ResponseEntity<?> addExpense(@RequestBody ExpenseRequest request) {
        try {
            Expense expense = expenseService.addExpense(
                    request.getTitle(),
                    request.getDescription(),
                    request.getAmount(),
                    request.getPaidByUserId(),
                    request.getGroupId()
            );
            return ResponseEntity.ok(expense);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ==============================
    // ✅ Get all expenses
    // ==============================
    @GetMapping
    public ResponseEntity<List<Expense>> getAllExpenses() {
        List<Expense> expenses = expenseService.getAllExpenses();
        return ResponseEntity.ok(expenses);
    }

    // ==============================
    // ✅ Get expenses by group
    // ==============================
    @GetMapping("/group/{groupId}")
    public ResponseEntity<?> getExpensesByGroup(@PathVariable Long groupId) {
        try {
            List<Expense> expenses = expenseService.getExpensesByGroup(groupId);
            return ResponseEntity.ok(expenses);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ==============================
    // ✅ Get expense by ID
    // ==============================
    @GetMapping("/{id}")
    public ResponseEntity<?> getExpenseById(@PathVariable Long id) {
        try {
            Expense expense = expenseService.getExpenseById(id);
            return ResponseEntity.ok(expense);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ==============================
    // ✅ Helper DTO for Expense request
    // ==============================
    public static class ExpenseRequest {
        private String title;
        private String description;
        private double amount;
        private Long paidByUserId;
        private Long groupId;

        // Getters & Setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public double getAmount() { return amount; }
        public void setAmount(double amount) { this.amount = amount; }

        public Long getPaidByUserId() { return paidByUserId; }
        public void setPaidByUserId(Long paidByUserId) { this.paidByUserId = paidByUserId; }

        public Long getGroupId() { return groupId; }
        public void setGroupId(Long groupId) { this.groupId = groupId; }
    }
}
