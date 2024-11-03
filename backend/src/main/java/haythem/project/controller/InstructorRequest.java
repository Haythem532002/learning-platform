package haythem.project.controller;

public record InstructorRequest(
        String firstname, String lastname, String email,
        String password
) {
}
