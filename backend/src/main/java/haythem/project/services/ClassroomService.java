package haythem.project.services;

import haythem.project.controller.ClassroomRequest;
import haythem.project.models.Classroom;
import haythem.project.models.File;
import haythem.project.models.Materials;
import haythem.project.repositories.ClassroomRepository;
import haythem.project.repositories.FileRepository;
import haythem.project.repositories.MaterialsRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class ClassroomService {

    private final FileRepository fileRepository;
    private final MaterialsRepository materialsRepository;
    private final ClassroomRepository classroomRepository;


    public Integer createClassroom(ClassroomRequest request) throws IOException {
        List<File> listOfFiles = new ArrayList<>();
        var files = request.files();

        files.forEach(file -> {
            try {
                var savedFile = File.builder()
                        .filename(file.getOriginalFilename())
                        .data(file.getBytes())
                        .build();
                fileRepository.save(savedFile);
                listOfFiles.add(
                        savedFile
                );
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
        var materials = Materials.builder()
                .files(listOfFiles)
                .build();
        materialsRepository.save(materials);
        //create fel classroom
        var classroom = Classroom.builder()
                .title(request.title())
                .description(request.description())
                .startTime(request.date())
                .materials(materials)
                .isPrivate(request.isPrivate())
                .password(request.password())
                .build();

        return classroomRepository.save(classroom).getId();
    }

    public List<Classroom> getClassrooms() {
        return classroomRepository.findAll();
    }

    public void deleteClassroom(Integer idClassroom) {
        classroomRepository.deleteById(idClassroom);
    }
   @Transactional
    public void addMaterial(MultipartFile file, Integer classroomId) throws IOException {

        Classroom classroom= classroomRepository.findById(classroomId).orElseThrow();

        List<File> files=classroom.getMaterials().getFiles();
        File newFile=File.builder()
                .data(file.getBytes())
                .filename(file.getOriginalFilename())
                .build();

        files.add(newFile);
        Materials materials=materialsRepository.findById(classroom.getMaterials().getId()).orElseThrow();
        materials.setFiles(files);
        classroom.setMaterials(materials);
        fileRepository.save(newFile);
        materialsRepository.save(materials);
        classroomRepository.save(classroom);

    }
}
