package com.expense_tracker.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.expense_tracker.entity.Expense;
import com.expense_tracker.entity.User;
import com.expense_tracker.repo.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {
	private final ExpenseRepository expenseRepository;

	public Expense save(Expense e) {
		return expenseRepository.save(e);
	}

	public List<Expense> listByUser(User user) {
		return expenseRepository.findByUser(user);
	}

	public List<Expense> filterByDate(User user, LocalDate start, LocalDate end) {
		return expenseRepository.findByUserAndDateBetween(user, start, end);
	}

	public List<Expense> filterByCategory(User user, String category) {
		return expenseRepository.findByUserAndCategoryIgnoreCase(user, category);
	}

	public Expense findByIdAndUserOrThrow(Long id, User user) {
		return expenseRepository.findByIdAndUser(id, user)
				.orElseThrow(() -> new RuntimeException("Expense not found."));
	}

	public void deleteByIdAndUser(Long id, User user) {
		Expense e = findByIdAndUserOrThrow(id, user);
		expenseRepository.delete(e);
	}
}
