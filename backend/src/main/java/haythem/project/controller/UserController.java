package haythem.project.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    @GetMapping
    public ResponseEntity<List<String>> getList() {
        return ResponseEntity.ok(List.of("haythem","khiari"));
    }
}
