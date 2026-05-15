package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.*;

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
        @Size(min = 5, max = 2000, message = "La recensione deve avere tra 5 e 2000 caratteri")
        String testo
) {
}
