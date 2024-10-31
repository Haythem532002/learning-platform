package haythem.project.repositories;

import haythem.project.models.Materials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MaterialsRepository extends JpaRepository<Materials, Integer> {
}