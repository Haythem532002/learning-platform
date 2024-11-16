package haythem.project.auth;

import haythem.project.user.RoleUser;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
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
    @Size(min = 8, message = "Password should be 8 characters minimum")
    String password;
    RoleUser roleUser;
}

