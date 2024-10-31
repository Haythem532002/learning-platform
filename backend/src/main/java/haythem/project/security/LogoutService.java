package haythem.project.security;

import haythem.project.token.TokenRepository;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {
    private final TokenRepository tokenRepository;
    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String header = request.getHeader("Authorization");
        if(header==null || !header.startsWith("Bearer ")) return;
        String token = header.substring(7);
        var tokenRepo = tokenRepository.findByToken(token).orElse(null);
        if(tokenRepo!=null) {
            tokenRepo.setExpired(true);
            tokenRepo.setRevoked(true);
            tokenRepository.save(tokenRepo);
        }
    }
}
