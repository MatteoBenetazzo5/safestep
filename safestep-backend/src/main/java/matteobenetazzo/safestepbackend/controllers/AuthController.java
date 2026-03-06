package matteobenetazzo.safestepbackend.controllers;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.payloads.LoginDTO;
import matteobenetazzo.safestepbackend.payloads.LoginResponseDTO;
import matteobenetazzo.safestepbackend.payloads.RegisterDTO;
import matteobenetazzo.safestepbackend.services.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    public Utente register(@RequestBody RegisterDTO body) {
        return this.authService.register(body);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@RequestBody LoginDTO body) {
        return this.authService.login(body);
    }
}
