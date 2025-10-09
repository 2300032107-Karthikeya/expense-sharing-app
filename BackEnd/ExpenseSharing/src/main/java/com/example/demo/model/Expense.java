package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    private String description;

    @Column(nullable = false)
    private double amount;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Who paid the expense
    @ManyToOne
    @JoinColumn(name = "paid_by_user_id", nullable = false)
    private User paidBy;

    // Which group this expense belongs to
    @ManyToOne
    @JoinColumn(name = "group_id", nullable = false)
    private Group group;

    // Constructors
    public Expense() {}

    public Expense(String title, String description, double amount, User paidBy, Group group) {
        this.title = title;
        this.description = description;
        this.amount = amount;
        this.paidBy = paidBy;
        this.group = group;
        this.createdAt = LocalDateTime.now();
    }

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public double getAmount() { return amount; }
    public void setAmount(double amount) { this.amount = amount; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public User getPaidBy() { return paidBy; }
    public void setPaidBy(User paidBy) { this.paidBy = paidBy; }

    public Group getGroup() { return group; }
    public void setGroup(Group group) { this.group = group; }
}
