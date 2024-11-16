package haythem.project.roles_permissions;


import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
public enum Role {
    USER(Set.of(
            Permission.USER_READ,
            Permission.USER_CREATE,
            Permission.USER_DELETE,
            Permission.USER_UPDATE
    )),
    INSTRUCTOR(Set.of(
            Permission.INSTRUCTOR_READ,
            Permission.INSTRUCTOR_CREATE,
            Permission.INSTRUCTOR_DELETE,
            Permission.INSTRUCTOR_UPDATE
    )),
    ;
    @Getter
    private final Set<Permission> permissions;

    public List<SimpleGrantedAuthority> getAuthorities() {
        var authorities = this.getPermissions()
                .stream()
                .map(permission ->new SimpleGrantedAuthority(permission.getPermission()))
                .toList()
                ;
        return authorities;
    }

}
