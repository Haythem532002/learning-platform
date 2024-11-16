package haythem.project.auth;

import haythem.project.models.Instructor;
import haythem.project.models.User;
import haythem.project.repositories.InstructorRepository;
import haythem.project.repositories.UserRepository;
import haythem.project.security.JwtService;
import haythem.project.token.Token;
import haythem.project.token.TokenRepository;
import haythem.project.user.RoleUser;
import haythem.project.user.UserAuth;
import haythem.project.user.UserAuthRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;

import static haythem.project.token.TokenType.BEARER;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserAuthRepository userAuthRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final TokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final InstructorRepository instructorRepository;

    public Integer register(RegistrationRequest request) {
//        var user = UserAuth.builder()
//                .firstname(request.getFirstName())
//                .lastname(request.getLastName())
//                .email(request.getEmail())
//                .password(passwordEncoder.encode(request.getPassword()))
//                .enabled(true)
//                .locked(false)
//                .roleUser(request.getRoleUser())
//                .build();
//
//        var authUser = userAuthRepository.save(user);
        if (request.getRoleUser() == RoleUser.USER) {
            var simpleUser = User.builder()
                    .firstname(request.getFirstName())
                    .lastname(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .enabled(true)
                    .locked(false)
                    .roleUser(request.getRoleUser())
                    .build();
            return userRepository.save(simpleUser).getId();
        } else {
            var instructor = Instructor.builder()
                    .firstname(request.getFirstName())
                    .lastname(request.getLastName())
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .enabled(true)
                    .locked(false)
                    .roleUser(request.getRoleUser())
                    .build();
            return instructorRepository.save(instructor).getId();
        }

    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        //use the authentication manager to authenticate the user with UsernamePasswordAuthenticationToken
        var auth = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = (UserAuth) auth.getPrincipal();
        var responseUser = new UserResponse(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getPassword(),
                user.getRoleUser()
        );
        var claims = new HashMap<String, Object>();
        // generate a jwt token
        String token = jwtService.generateToken(claims, user);
        revokeAllTokens(user);
        var tokenRepo = Token.builder()
                .token(token)
                .userAuth(user)
                .expired(false)
                .revoked(false)
                .type(BEARER)
                .build();
        tokenRepository.save(tokenRepo);
        //return the token
        return AuthenticationResponse.builder()
                .token(token)
                .response(responseUser)
                .build();
    }

    private void revokeAllTokens(UserAuth userAuth) {
        List<Token> tokens = tokenRepository.findAllValidTokens(userAuth.getId());
        if (tokens.isEmpty()) return;
        tokens.forEach(
                t -> {
                    t.setRevoked(true);
                    t.setExpired(true);
                }
        );
        tokenRepository.saveAll(tokens);
    }
}
