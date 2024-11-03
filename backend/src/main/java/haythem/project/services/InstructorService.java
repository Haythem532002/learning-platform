package haythem.project.services;

import haythem.project.controller.InstructorRequest;
import haythem.project.models.Instructor;
import haythem.project.repositories.InstructorRepository;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class InstructorService {
    private final InstructorRepository repository;
    public Integer createInstructor(InstructorRequest request) {
        var instructor = Instructor.builder()
                .firstname(request.firstname())
                .lastname(request.lastname())
                .email(request.email())
                .password(request.password())
                .build();
        return repository.save(instructor).getId();
    }

    public Integer getInstructor(Integer id) {
        var instructor = repository.findById(id).orElseThrow(()->new EntityNotFoundException("Instructor Not Found"));
        return instructor.getId();
    }
}
