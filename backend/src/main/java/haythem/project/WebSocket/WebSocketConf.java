package haythem.project.WebSocket;
import com.fasterxml.jackson.databind.ObjectMapper;
import haythem.project.WebSocket.Socket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.logging.SocketHandler;

@Configuration
@EnableWebSocket
public class WebSocketConf implements WebSocketConfigurer {


    @Bean
    public Socket socketHandler() {
            return new Socket(); // Create a SocketHandler bean

         }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(socketHandler(), "/ws") // Use the SocketHandler bean
                .setAllowedOrigins("*"); // Allow all origins for testing
    }
}
