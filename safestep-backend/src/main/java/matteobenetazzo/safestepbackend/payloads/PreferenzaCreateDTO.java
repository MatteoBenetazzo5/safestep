package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record PreferenzaCreateDTO(

        @NotNull
        UUID utenteId,

        @NotNull
        UUID caratteristicaId,

        @NotBlank
        String livelloPreferenza
) {
}
