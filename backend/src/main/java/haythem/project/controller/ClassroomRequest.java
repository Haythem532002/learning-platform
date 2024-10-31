package haythem.project.controller;


import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

public record ClassroomRequest(
        String title,
        String description,
        boolean isPrivate,
        String password,
        LocalDateTime date,
        List<MultipartFile> files
) {
}
