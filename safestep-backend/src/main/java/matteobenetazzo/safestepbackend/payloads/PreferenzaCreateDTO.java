package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;

import java.util.UUID;

public record PreferenzaCreateDTO(

        @NotNull(message = "Id utente obbligatorio")
        UUID utenteId,

        @NotNull(message = "Id caratteristica obbligatorio")
        UUID caratteristicaId,

        @NotBlank(message = "Livello preferenza obbligatorio")
        @Pattern(
                regexp = "^(IMPORTANTE|UTILE|OPZIONALE)$",
                message = "Livello preferenza non valido"
        )
        String livelloPreferenza
) {
}
