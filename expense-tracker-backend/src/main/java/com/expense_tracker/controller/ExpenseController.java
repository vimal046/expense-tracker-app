package com.expense_tracker.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.expense_tracker.dto.ExpenseDTO;
import com.expense_tracker.entity.Expense;
import com.expense_tracker.entity.User;
import com.expense_tracker.service.ExpenseService;
import com.expense_tracker.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/expenses")
@RequiredArgsConstructor
public class ExpenseController {

	private final ExpenseService expenseService;
	private final UserService userService;

	private User currentUser(Authentication authentication) {
		UserDetails principal = (UserDetails) authentication.getPrincipal();
		return userService.findByUsernameOrThrow(principal.getUsername());
	}

	@PostMapping
	public Expense createExpense(@Valid @RequestBody ExpenseDTO dto, Authentication authentication) {
		User user = currentUser(authentication);
		Expense e = Expense.builder().title(dto.getTitle()).amount(dto.getAmount()).category(dto.getCategory())
				.date(dto.getDate()).description(dto.getDescription()).user(user).build();
		return expenseService.save(e);
	}

	@GetMapping
	public List<Expense> listExpenses(Authentication authentication, @RequestParam(required = false) String category,
			@RequestParam(required = false) String startDate, @RequestParam(required = false) String endDate) {

		User user = currentUser(authentication);
		if (category != null && !category.isBlank()) {
			return expenseService.filterByCategory(user, category);
		}
		if (startDate != null && endDate != null) {
			LocalDate start = LocalDate.parse(startDate);
			LocalDate end = LocalDate.parse(endDate);
			return expenseService.filterByDate(user, start, end);
		}
		return expenseService.listByUser(user);
	}

	@PutMapping("/{id}")
	public Expense updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseDTO dto,
			Authentication authentication) {

		User user = currentUser(authentication);
		Expense e = expenseService.findByIdAndUserOrThrow(id, user);
		e.setTitle(dto.getTitle());
		e.setAmount(dto.getAmount());
		e.setCategory(dto.getCategory());
		e.setDate(dto.getDate());
		e.setDescription(dto.getDescription());
		return expenseService.save(e);
	}

	@DeleteMapping("{id}")
	public void deleteExpense(@PathVariable Long id, Authentication authentication) {
		User user = currentUser(authentication);
		expenseService.deleteByIdAndUser(id, user);
	}
}
