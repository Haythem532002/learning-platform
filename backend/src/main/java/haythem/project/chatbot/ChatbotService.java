package haythem.project.chatbot;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class ChatbotService {
    private final RestTemplate restTemplate;


    public String sendMessageToChatbot(String message) {
        String url = "https://dialogflow.googleapis.com/v2/projects/chatbot-learning-platform-xayo/agent/sessions/2d356172-38fc-29b9-5018-4222d0d784a1:detectIntent";

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json; charset=utf-8");
        headers.set("Authorization", "Bearer ya29.a0AeDClZBYlS_dpOgwZuk1nOCIcGEGp9PFu23-W-5KWtfxXEOAgnTVHoNW4jIu03KMjFwgUosSJo9aKyswUjaRz48TDUKhgDlHVzHKUYAlgxTeUzJ6c8xMnbWQ0yh2aOpLaVl29YNfZtrBEHNlf27PVoZmMEQaBLjM-MaywW7tTFb-c66i7yITC71-3l51aLD6rgpMvrxlRCmzZNaM74qF1cds3HnqkTCJi1NQ5WxCps2Qs8tA1VgXuJbLpg4IYtOgNVhFB-06JJmdCHkpmuymSz32s7Abl-hqIvg66GtPCoMgKYtRfzz-914k6OoboW0NzRrDDMwXv3K2JeiHg2LdD4FvDvjWa56t49Ze6RrzdbQF_UN5kIGU1LnLGABrnSsJFhcmmGTY98eeyi_odnG8V1jYgRwRRnIVIRNTBjUWCK4nVAaCgYKAZgSARASFQHGX2MiYln0unPKdScYPdMMsxtfOw0437");

        Map<String, String> textContent = new HashMap<>();
        textContent.put("text", message);
        textContent.put("languageCode", "en");

        Map<String, Map<String, String>> textQuery = new HashMap<>();
        textQuery.put("text", textContent);

        Map<String, String> queryParams = new HashMap<>();
        queryParams.put("source", "DIALOGFLOW_CONSOLE");
        queryParams.put("timeZone", "Africa/Lagos");

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("queryInput", textQuery);
        requestBody.put("queryParams", queryParams);

        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, requestEntity, String.class);

        return response.getBody();
    }
}
