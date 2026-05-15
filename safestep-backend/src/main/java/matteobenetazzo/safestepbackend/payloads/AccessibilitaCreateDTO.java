package matteobenetazzo.safestepbackend.payloads;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.UUID;

public record AccessibilitaCreateDTO(

        @NotNull(message = "Id struttura obbligatorio")
        UUID strutturaId,

        @NotNull(message = "Id caratteristica obbligatorio")
        UUID caratteristicaId,

        @NotBlank(message = "Valore obbligatorio")
        @Size(max = 80, message = "Valore troppo lungo")
        String valore,

        @Size(max = 1000, message = "Nota troppo lunga")
        String nota
) {
}
