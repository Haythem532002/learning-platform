package haythem.project.roles_permissions;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    INSTRUCTOR_READ("instructor:read"),
    INSTRUCTOR_CREATE("instructor:create"),
    INSTRUCTOR_DELETE("instructor:delete"),
    INSTRUCTOR_UPDATE("instructor:update"),
    USER_READ("user_read"),
    USER_CREATE("user_create"),
    USER_DELETE("user_delete"),
    USER_UPDATE("user_update"),
    ;
    @Getter
    private final String permission;
}
