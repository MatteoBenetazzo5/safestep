package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.*;

public record StrutturaUpdateDTO(

        @NotBlank(message = "Categoria obbligatoria")
        @Size(max = 40, message = "Categoria troppo lunga")
        String categoria,

        @NotBlank(message = "Nome obbligatorio")
        @Size(min = 2, max = 120, message = "Il nome deve avere tra 2 e 120 caratteri")
        String nome,

        @Size(max = 5000, message = "Descrizione troppo lunga")
        String descrizione,

        @Size(max = 200, message = "Indirizzo troppo lungo")
        String indirizzo,

        @Size(max = 80, message = "Città troppo lunga")
        String citta,

        @Size(max = 80, message = "Paese troppo lungo")
        String paese,

        @Size(max = 30, message = "Telefono troppo lungo")
        @Pattern(
                regexp = "^(|[+0-9 ()-]{6,30})$",
                message = "Telefono non valido"
        )
        String telefono,

        @Size(max = 500, message = "Sito web troppo lungo")
        @Pattern(
                regexp = "^(|https?://.+)$",
                message = "Sito web deve essere un URL valido"
        )
        String sitoWeb,

        @Size(max = 500, message = "URL immagine troppo lungo")
        @Pattern(
                regexp = "^(|https?://.+)$",
                message = "Immagine copertina deve essere un URL valido"
        )
        String immagineCopertina,

        @DecimalMin(value = "-90.0", message = "Latitudine non valida")
        @DecimalMax(value = "90.0", message = "Latitudine non valida")
        Double latitudine,

        @DecimalMin(value = "-180.0", message = "Longitudine non valida")
        @DecimalMax(value = "180.0", message = "Longitudine non valida")
        Double longitudine,

        @NotBlank(message = "Stato obbligatorio")
        @Pattern(
                regexp = "^(APPROVATA|BOZZA|IN_REVISIONE)$",
                message = "Stato non valido"
        )
        String stato
) {
}
