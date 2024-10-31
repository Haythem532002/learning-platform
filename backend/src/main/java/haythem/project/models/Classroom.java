package haythem.project.models;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Classroom {
    @Id
    @GeneratedValue
    Integer id;
    String title;
    String description;
    boolean isPrivate;
    String password;
    LocalDateTime startTime;
    boolean isActive;
    @OneToOne
    Materials materials;
    String streamId;
}
