package haythem.project.controller;

public record UserRequest(
        String firstname, String lastname, String email,
        String password) {
}
