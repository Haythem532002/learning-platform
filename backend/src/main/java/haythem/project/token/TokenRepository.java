package haythem.project.token;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TokenRepository extends JpaRepository<Token, Integer> {

    Optional<Token> findByToken(String token);
    @Query("""
        select t from Token t inner join UserAuth u on t.userAuth.id=u.id 
        where u.id=:userId and t.revoked=false and t.expired=false 
""")
    List<Token> findAllValidTokens(Integer userId);
}