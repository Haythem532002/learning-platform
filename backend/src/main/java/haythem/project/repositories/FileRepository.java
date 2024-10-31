package haythem.project.repositories;

import haythem.project.models.File;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FileRepository extends JpaRepository<File, Integer> {
}