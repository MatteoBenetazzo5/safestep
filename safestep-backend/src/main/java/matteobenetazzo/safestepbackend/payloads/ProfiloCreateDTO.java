package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ProfiloCreateDTO(

        @NotNull
        UUID utenteId,

        @NotBlank
        String tipoMobilita,

        String note,

        String coloreTema
) {
}