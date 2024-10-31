package haythem.project.token;

import haythem.project.user.UserAuth;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@AllArgsConstructor @NoArgsConstructor
@Builder
@Getter @Setter
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Token {
    @Id @GeneratedValue
    Integer id;
    @Column(length = 1024)
    String token;
    @Enumerated(EnumType.STRING)
    TokenType type;

    boolean expired;
    boolean revoked;
    @ManyToOne
    @JoinColumn(name = "user_id")
    UserAuth userAuth;
}
