package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record StrutturaSalvataCreateDTO(

        @NotNull
        UUID utenteId,

        @NotNull
        UUID strutturaId
) {
}
