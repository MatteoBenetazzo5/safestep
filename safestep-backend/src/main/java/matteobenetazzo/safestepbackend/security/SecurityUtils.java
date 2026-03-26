package matteobenetazzo.safestepbackend.security;

import matteobenetazzo.safestepbackend.entities.Utente;
import matteobenetazzo.safestepbackend.exceptions.NotFoundException;
import matteobenetazzo.safestepbackend.repositories.UtenteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public class SecurityUtils {

    @Autowired
    private UtenteRepository utenteRepository;

    public Utente getCurrentAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new NotFoundException("Utente autenticato non trovato");
        }

        String emailUtente = authentication.getName();

        return this.utenteRepository.findByEmail(emailUtente)
                .orElseThrow(() -> new NotFoundException("Utente autenticato non trovato"));
    }

    public boolean isOwner(Utente utente) {
        Utente currentUser = this.getCurrentAuthenticatedUser();
        return currentUser.getIdUtente().equals(utente.getIdUtente());
    }

    public boolean isAdmin() {
        Utente currentUser = this.getCurrentAuthenticatedUser();
        return "ADMIN".equals(currentUser.getRuolo());
    }

    public void checkOwnerOrAdmin(Utente utente) {
        if (!isOwner(utente) && !isAdmin()) {
            throw new IllegalArgumentException("Non autorizzato a questa operazione");
        }
    }
}