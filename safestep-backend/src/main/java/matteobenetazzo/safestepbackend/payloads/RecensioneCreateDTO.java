package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record RecensioneCreateDTO(

        @NotNull(message = "Id struttura obbligatorio")
        UUID strutturaId,

        @NotNull(message = "Id utente obbligatorio")
        UUID utenteId,

        @Min(value = 1, message = "Il voto minimo è 1")
        @Max(value = 5, message = "Il voto massimo è 5")
        int voto,

        @NotBlank(message = "Testo obbligatorio")
        String testo
) {
}
