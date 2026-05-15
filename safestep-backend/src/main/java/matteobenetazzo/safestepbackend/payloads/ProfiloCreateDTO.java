package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record ProfiloCreateDTO(

        @NotNull(message = "Id utente obbligatorio")
        UUID utenteId,

        @NotBlank(message = "Tipo mobilità obbligatorio")
        @Size(min = 2, max = 80, message = "Tipo mobilità deve avere tra 2 e 80 caratteri")
        String tipoMobilita,

        @Size(max = 1500, message = "Note troppo lunghe")
        String note,

        @Size(max = 40, message = "Colore tema troppo lungo")
        @Pattern(
                regexp = "^(|[a-zA-ZÀ-ÿ\\s-]{2,40}|#[A-Fa-f0-9]{6})$",
                message = "Colore tema non valido"
        )
        String coloreTema
) {
}