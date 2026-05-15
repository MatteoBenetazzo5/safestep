package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record UtenteUpdateDTO(

        @NotBlank(message = "Email obbligatoria")
        @Email(message = "Email non valida")
        @Size(max = 120, message = "Email troppo lunga")
        String email,

        @NotBlank(message = "Nome visualizzato obbligatorio")
        @Size(min = 2, max = 50, message = "Il nome visualizzato deve avere tra 2 e 50 caratteri")
        String nomeVisualizzato,

        @Size(max = 30, message = "Telefono troppo lungo")
        @Pattern(
                regexp = "^(|[+0-9 ()-]{6,30})$",
                message = "Telefono non valido"
        )
        String telefono,

        @Size(max = 500, message = "Avatar URL troppo lungo")
        @Pattern(
                regexp = "^(|https?://.+)$",
                message = "Avatar deve essere un URL valido"
        )
        String avatar
) {
}