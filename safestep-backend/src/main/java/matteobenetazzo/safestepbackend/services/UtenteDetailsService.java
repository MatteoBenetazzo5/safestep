package matteobenetazzo.safestepbackend.services;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UtenteDetailsService implements UserDetailsService {

    @Autowired
    private UtenteRepository utenteRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utente utente = this.utenteRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato"));

        return new User(
                utente.getEmail(),
                utente.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + utente.getRuolo()))
        );
    }

    public UserDetails loadUserById(UUID idUtente) {
        Utente utente = this.utenteRepository.findById(idUtente)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato"));

        return new User(
                utente.getEmail(),
                utente.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + utente.getRuolo()))
        );
    }
}
