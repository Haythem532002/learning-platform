package haythem.project.chatbot;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class ChatbotController {
    private final ChatbotService service;


    @GetMapping("/chatbot")
    public ResponseEntity<String> chat(@RequestParam String message) {
        String response = service.sendMessageToChatbot(message);
        return ResponseEntity.ok(response);
    }
}
