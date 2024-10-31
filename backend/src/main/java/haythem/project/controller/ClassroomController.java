package haythem.project.controller;

import haythem.project.models.Classroom;
import haythem.project.services.ClassroomService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/classroom")
@RequiredArgsConstructor
@Slf4j
public class ClassroomController {
    private final ClassroomService classroomService;

    @PostMapping
    public ResponseEntity<Integer> createClassroom(@ModelAttribute ClassroomRequest classroomRequest
    ) throws IOException {
        return ResponseEntity.ok(classroomService.createClassroom(classroomRequest));
    }

    @GetMapping
    public ResponseEntity<List<Classroom>> getClassrooms() {
        return ResponseEntity.ok(classroomService.getClassrooms());
    }

    @DeleteMapping("/{idClassroom}")
    public ResponseEntity<Void> deleteClassroom(@PathVariable("idClassroom") Integer idClassroom) {
        classroomService.deleteClassroom(idClassroom);
        return ResponseEntity.accepted().build();
    }

    @PutMapping("/addMaterial/{classroomId}")
    public ResponseEntity<Void> addMaterial(@RequestParam("files") MultipartFile file,@PathVariable Integer classroomId) throws IOException {
        classroomService.addMaterial(file,classroomId);
        return ResponseEntity.accepted().build();

    }



}
