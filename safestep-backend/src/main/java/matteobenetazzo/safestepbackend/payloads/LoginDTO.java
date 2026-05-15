package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginDTO(

        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        @Size(max = 120, message = "Email troppo lunga")
        String email,

        @NotBlank(message = "Password obbligatoria")
        @Size(max = 72, message = "Password troppo lunga")
        String password
) {
}

