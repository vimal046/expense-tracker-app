package com.expense_tracker.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.expense_tracker.dto.LoginRequest;
import com.expense_tracker.dto.LoginResponse;
import com.expense_tracker.dto.SignupRequest;
import com.expense_tracker.security.JwtUtil;
import com.expense_tracker.service.UserService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

	private final UserService userService;
	private final JwtUtil jwtUtil;
	private final AuthenticationManager authenticationManager;

	@PostMapping("/signup")
	public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest request) {
		if (userService.existsByUsername(request.getUsername())) {
			return ResponseEntity.badRequest().body("username already exists.");
		}
		userService.createUser(request.getUsername(), request.getPassword());
		return ResponseEntity.ok("user registered successfully");
	}

	@PostMapping("/login")
	public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
		} catch (BadCredentialsException ex) {
			throw new BadCredentialsException("invalid credentials");
		}
		String token = jwtUtil.generateTken(request.getUsername());
		return ResponseEntity.ok(new LoginResponse(token, request.getUsername()));
	}
}
