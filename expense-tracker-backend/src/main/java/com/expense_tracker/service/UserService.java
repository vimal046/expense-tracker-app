package com.expense_tracker.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.expense_tracker.entity.User;
import com.expense_tracker.repo.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;

	public boolean existsByUsername(String username) {
		return userRepository.existsByUsername(username);
	}

	public User createUser(String username, String rawPassword) {
		User user = User.builder().username(username).password(passwordEncoder.encode(rawPassword)).role("ROLE_USER")
				.build();
		return userRepository.save(user);
	}

	public User findByUsernameOrThrow(String username) {
		return userRepository.findByUsername(username).orElseThrow(() -> new RuntimeException("User not found"));
	}
}
