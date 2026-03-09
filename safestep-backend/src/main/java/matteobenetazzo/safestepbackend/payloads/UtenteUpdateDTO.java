package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public record UtenteUpdateDTO(

        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        String email,

        @NotBlank(message = "Nome visualizzato obbligatorio")
        String nomeVisualizzato,

        String telefono,
        String avatar
) {
}