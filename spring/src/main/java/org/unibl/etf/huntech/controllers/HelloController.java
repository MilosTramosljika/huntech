package org.unibl.etf.huntech.controllers;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("/hello")
    public String hello(@AuthenticationPrincipal Jwt jwt) {
        // Jwt sadrži podatke iz tokena (npr. "sub" = supabase UID)
        return "Pozdrav " + jwt.getSubject();
    }
}