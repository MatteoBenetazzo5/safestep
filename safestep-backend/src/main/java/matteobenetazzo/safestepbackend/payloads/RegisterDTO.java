package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterDTO(

        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        String email,

        @NotBlank(message = "Password obbligatoria")
        @Size(min = 6, message = "La password deve avere almeno 6 caratteri")
        String password,

        @NotBlank(message = "Nome visualizzato obbligatorio")
        String nomeVisualizzato,

        String telefono,
        String avatar
) {
}

