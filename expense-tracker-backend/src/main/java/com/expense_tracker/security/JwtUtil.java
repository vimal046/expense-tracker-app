package com.expense_tracker.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

	@Value("${app.jwt.secret}")
	private String jwtSecret;

	@Value("${app.jwt.expiration-ms}")
	private long jwtExpirationMs;

	private Key getSigningKey() {
		return Keys.hmacShaKeyFor(jwtSecret.getBytes());
	}

	public String generateTken(String username) {
		Date now = new Date();
		Date expiry = new Date(now.getTime() + jwtExpirationMs);
		return Jwts.builder().setSubject(username).setIssuedAt(now).setExpiration(expiry)
				.signWith(getSigningKey(), SignatureAlgorithm.HS256).compact();
	}

	public String getUsernameFromToken(String token) {
		return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token);
			return true;
		} catch (JwtException | IllegalArgumentException ex) {
			return false;
		}
	}
}
