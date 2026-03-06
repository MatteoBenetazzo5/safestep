package matteobenetazzo.safestepbackend.payloads;

public record RegisterDTO(
        String email,
        String password,
        String nomeVisualizzato,
        String telefono,
        String avatar
) {
}

