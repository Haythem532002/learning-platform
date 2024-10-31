package haythem.project.models;

import haythem.project.user.UserAuth;
import jakarta.persistence.Entity;
import lombok.*;
import lombok.experimental.FieldDefaults;
import lombok.experimental.SuperBuilder;


@Getter
@Setter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Instructor extends UserAuth {
    Integer lesson;
}
