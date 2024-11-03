package haythem.project.controller;

import haythem.project.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    @GetMapping("/{id}")
    public ResponseEntity<Integer> getUser(@PathVariable("id") Integer id ) {
        return ResponseEntity.ok(userService.getUser(id));
    }
    @PostMapping
    public ResponseEntity<Integer> createUser(@RequestBody UserRequest request) {
        return ResponseEntity.ok(userService.createUser(request));
    }
}