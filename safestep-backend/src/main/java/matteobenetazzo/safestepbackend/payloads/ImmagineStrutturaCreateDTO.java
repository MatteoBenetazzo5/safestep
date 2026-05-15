package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.*;

import java.util.UUID;

public record ImmagineStrutturaCreateDTO(

        @NotNull(message = "Id struttura obbligatorio")
        UUID strutturaId,

        @NotBlank(message = "URL immagine obbligatorio")
        @Size(max = 500, message = "URL immagine troppo lungo")
        @Pattern(
                regexp = "^https?://.+$",
                message = "URL immagine non valido"
        )
        String url,

        @Min(value = 0, message = "Ordine visualizzazione non valido")
        @Max(value = 100, message = "Ordine visualizzazione troppo alto")
        int ordineVisualizzazione,

        boolean copertina
) {
}