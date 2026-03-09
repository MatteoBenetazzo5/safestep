package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.UUID;

public record ImmagineStrutturaCreateDTO(

        @NotNull
        UUID strutturaId,

        @NotBlank
        String url,

        int ordineVisualizzazione,

        boolean copertina
) {
}
