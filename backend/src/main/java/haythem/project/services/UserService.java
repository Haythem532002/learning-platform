package haythem.project.services;

import haythem.project.controller.UserRequest;
import haythem.project.models.User;
import haythem.project.repositories.UserRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public Integer createUser(UserRequest request) {
        var user = User.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(request.password())
                .build();
        return userRepository.save(user).getId();
    }

    public Integer getUser(Integer id) {
        var user = userRepository.findById(id).orElseThrow(()->new EntityNotFoundException("User Not Found"));
        return user.getId();
    }
}
