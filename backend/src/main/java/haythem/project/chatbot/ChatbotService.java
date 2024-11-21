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
        headers.set("Authorization", "Bearer ya29.a0AeDClZAG1MKwgQbiYamFZlg5ieQATI-QR2EzjITKV8zaAkInbUDmfhb_vAcj-D0XT8He2GnQfRRWOr9fzPfRvfEz0LTETSTYjULSrxlNL5oaOuk2pG221ecUrFHLaHgAjdPQZIl3EQMf6YvvaKT4tfRWTAb4dsGehb4MhlNyQJ3w5f6XRxGnOdIMP0WA1ZkpFuFl8GL6nwOlzf3Y7jxmIBtYQfaBk16VMlpPZYxx0eY4xA-7OUmBetfTY9InbLmpgtfeUnwbzxkoHY7LW6zQidvgwDSVMPCXtcNPjc0nUT4iS-7P8apzwQM2wE7oVTuSQoGklRg0yEzSIXJ0CV6r5ml0vF7gwJnGNr2JbeKzaiZ82gCBzwc7rTxp_L0m3EKWTqVsDKEpWZsJ_mA8nuaUmP4xL_0uYWprkiW60ylvhQkDaCgYKARUSARASFQHGX2MigVtIangryQ-xvdzwH7ivIA0435");

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
