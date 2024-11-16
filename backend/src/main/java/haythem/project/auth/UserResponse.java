package haythem.project.auth;

import haythem.project.user.RoleUser;

public record UserResponse(
        Integer id,
        String firstname,
        String lastname,
        String email,
        String password,
        RoleUser roleUser
) {
}
