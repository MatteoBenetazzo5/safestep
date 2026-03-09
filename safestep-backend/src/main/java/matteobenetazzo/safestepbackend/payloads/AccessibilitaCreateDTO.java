package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record AccessibilitaCreateDTO(

        @NotNull
        UUID strutturaId,

        @NotNull
        UUID caratteristicaId,

        @NotBlank
        String valore,

        String nota
) {
}
