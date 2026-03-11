package matteobenetazzo.safestepbackend.payloads;

import java.util.UUID;

public record LoginResponseDTO(
        String accessToken,
        UUID idUtente,
        String email,
        String nomeVisualizzato,
        String ruolo
) {
}
