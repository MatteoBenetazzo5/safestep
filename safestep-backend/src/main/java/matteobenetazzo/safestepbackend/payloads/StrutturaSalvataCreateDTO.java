package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record StrutturaSalvataCreateDTO(

        @NotNull(message = "Id utente obbligatorio")
        UUID utenteId,

        @NotNull(message = "Id struttura obbligatorio")
        UUID strutturaId
) {
}
