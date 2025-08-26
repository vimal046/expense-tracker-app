package com.expense_tracker.repo;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.expense_tracker.entity.Expense;
import com.expense_tracker.entity.User;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense, Long> {
	
	List<Expense> findByUser(User user);

	List<Expense> findByUserAndDateBetween(User user, LocalDate start, LocalDate end);

	List<Expense> findByUserAndCategoryIgnoreCase(User user, String category);

	Optional<Expense> findByIdAndUser(Long id, User user);
}
