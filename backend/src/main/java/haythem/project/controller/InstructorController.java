package haythem.project.controller;

import haythem.project.services.InstructorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/instructor")
@RequiredArgsConstructor
public class InstructorController {
    private final InstructorService instructorService;

    @GetMapping("{id}")
    public ResponseEntity<Integer> getInstructor(@PathVariable("id") Integer id) {
        return ResponseEntity.ok(instructorService.getInstructor(id));
    }

    @PostMapping
    public ResponseEntity<Integer> createInstructor(@RequestBody InstructorRequest request) {
        return ResponseEntity.ok(instructorService.createInstructor(request));
    }


}
