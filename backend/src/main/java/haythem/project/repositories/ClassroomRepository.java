package haythem.project.repositories;

import haythem.project.models.Classroom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClassroomRepository extends JpaRepository<Classroom, Integer> {
}