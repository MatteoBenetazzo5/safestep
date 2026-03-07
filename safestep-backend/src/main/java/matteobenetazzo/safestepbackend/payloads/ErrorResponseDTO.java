package matteobenetazzo.safestepbackend.payloads;

import java.time.LocalDateTime;

public record ErrorResponseDTO(
        String message,
        LocalDateTime timestamp
) {
}
