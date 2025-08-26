package com.expense_tracker.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ExpenseDTO {

	@NotBlank
	private String title;
	@NotNull
	private BigDecimal amount;
	@NotBlank
	private String category;
	@NotNull
	private LocalDate date;
	private String description;
}
