package haythem.project.auth;

import jakarta.validation.constraints.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter @Setter @Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RegistrationRequest {
    @NotBlank(message = "Firstname is mandatory")
    String firstName;
    @NotBlank(message = "Lastname is mandatory")
    String lastName;
    @Email(message = "Email is not formatted")
    @NotBlank(message = "Email is Mandatory")
    String email;
    @NotBlank(message = "Password is Mandatory")
    @Size(min = 8 , message = "Password should be 8 characters minimum")
    String password;
}

