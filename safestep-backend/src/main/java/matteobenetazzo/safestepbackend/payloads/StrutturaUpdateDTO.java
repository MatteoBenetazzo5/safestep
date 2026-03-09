package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;

public record StrutturaUpdateDTO(

        @NotBlank(message = "Categoria obbligatoria")
        String categoria,

        @NotBlank(message = "Nome obbligatorio")
        String nome,

        String descrizione,
        String indirizzo,
        String citta,
        String paese,
        String telefono,
        String sitoWeb,
        String immagineCopertina,
        Double latitudine,
        Double longitudine,

        @NotBlank(message = "Stato obbligatorio")
        String stato
) {
}
