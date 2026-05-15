package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RecensioneUpdateDTO(

        @Min(value = 1, message = "Il voto minimo è 1")
        @Max(value = 5, message = "Il voto massimo è 5")
        int voto,

        @NotBlank(message = "Testo obbligatorio")
        @Size(min = 5, max = 2000, message = "La recensione deve avere tra 5 e 2000 caratteri")
        String testo
) {
}
