package com.expense_tracker.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getFieldErrors().forEach(err -> errors.put(err.getField(), err.getDefaultMessage()));
		return ResponseEntity.badRequest().body(errors);
	}

	@ExceptionHandler(BadCredentialsException.class)
	public ResponseEntity<?> handleBadCredentials(BadCredentialsException ex) {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(ex.getMessage());
	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<?> handleRuntime(RuntimeException ex) {
		return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(ex.getMessage());
	}

}
