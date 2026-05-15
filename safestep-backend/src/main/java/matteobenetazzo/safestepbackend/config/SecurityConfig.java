package matteobenetazzo.safestepbackend.config;

import matteobenetazzo.safestepbackend.security.JwtFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.csrf(AbstractHttpConfigurer::disable);

        httpSecurity.cors(cors -> cors.configurationSource(corsConfigurationSource));

        httpSecurity.sessionManagement(session ->
                session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
        );

        httpSecurity.authorizeHttpRequests(requests -> requests
                .requestMatchers("/auth/**").permitAll()

                .requestMatchers(HttpMethod.GET, "/strutture/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/immagini-struttura/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/recensioni/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/caratteristiche/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/accessibilita/**").permitAll()

                .requestMatchers(HttpMethod.POST, "/strutture/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/strutture/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/strutture/**").hasRole("ADMIN")

                .requestMatchers(HttpMethod.POST, "/caratteristiche/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/caratteristiche/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/caratteristiche/**").hasRole("ADMIN")

                .requestMatchers(HttpMethod.POST, "/accessibilita/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.PUT, "/accessibilita/**").hasRole("ADMIN")
                .requestMatchers(HttpMethod.DELETE, "/accessibilita/**").hasRole("ADMIN")

                .requestMatchers(HttpMethod.POST, "/upload/**").hasRole("ADMIN")

                .anyRequest().authenticated()
        );

        httpSecurity.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return httpSecurity.build();
    }
}

