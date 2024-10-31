package haythem.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/instructor")
public class InstructorController {
    @GetMapping
    public ResponseEntity<List<String>> getList() {
        return ResponseEntity.ok(List.of("haythem","khiari"));
    }
//    @PostMapping
//    public ResponseEntity<Integer> createInstructor(@RequestBody ) {
//
//    }
}
