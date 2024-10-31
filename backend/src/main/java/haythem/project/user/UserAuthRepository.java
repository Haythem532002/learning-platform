package haythem.project.user;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAuthRepository extends JpaRepository<UserAuth, Integer> {
    UserAuth findByEmail(String email);
}