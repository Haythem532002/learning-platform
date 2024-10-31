package haythem.project.security;

import haythem.project.token.Token;
import haythem.project.token.TokenRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.security.Principal;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final TokenRepository tokenRepository;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {
        if(Objects.equals(request.getServletPath(), "/api/v1/auth/**")) {
            filterChain.doFilter(request,response);
            return;
        }
        //check if the header starts with bearer and get the jwt token
        String header = request.getHeader("Authorization");
        if(header==null || !header.startsWith("Bearer ")) {
            filterChain.doFilter(request,response);
            return;
        }
        String jwtToken = header.substring(7);

        //extract the username from the jwt Token
        String emailToken = jwtService.extractUsername(jwtToken);

        if(emailToken!=null && SecurityContextHolder.getContext().getAuthentication()==null) {
            UserDetails userDetails = userDetailsService.loadUserByUsername(emailToken);
            boolean isTokenValid = tokenRepository.findByToken(jwtToken)
                    .map(t-> !t.isExpired() && !t.isRevoked())
                    .orElse(false)
                    ;

            if(jwtService.isTokenValid(jwtToken,userDetails) && isTokenValid) {
                //create username and password token
                UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                        userDetails,
                        null,
                        userDetails.getAuthorities()
                );
                // Attach additional details about the request (IP address, session ID) to the authToken
                authToken.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(request)
                );
                // update security context holder
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        }
        filterChain.doFilter(request,response);
    }
}
