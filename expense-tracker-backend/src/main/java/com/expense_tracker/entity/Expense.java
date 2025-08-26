package com.expense_tracker.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "expenses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Expense {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String title;

	@Column(nullable = false, precision = 12, scale = 2)
	private BigDecimal amount;

	@Column(nullable = false, length = 50)
	private String category;

	@Column(nullable = false)
	private LocalDate date;

	@Column(length = 255)
	private String description;

	@ManyToOne(optional = false, fetch = FetchType.LAZY)
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;
}
