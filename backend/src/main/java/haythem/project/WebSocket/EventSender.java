package haythem.project.WebSocket;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EventSender {

    private String eventName;
    private String data;

    private WebSocketSession session;

    public void emit() throws IOException {
        System.out.println(session.getId()+" is sent "+eventName+" "+data);
        session.sendMessage(new TextMessage("{\"event\":\""+eventName+"\",\"data\":"+data+"}"));
    }


}
