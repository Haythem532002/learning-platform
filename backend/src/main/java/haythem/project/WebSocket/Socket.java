package haythem.project.WebSocket;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;


@RequiredArgsConstructor

@Component
public class Socket extends TextWebSocketHandler {
    private final ObjectMapper om=new ObjectMapper();
    private ArrayList<WebSocketSession> sessionList=new ArrayList<>();
    private HashMap<String,String> streamList=new HashMap<>();



    public void print(ArrayList<WebSocketSession> l){
        System.out.println("---------->");
        l.forEach((element)->{
            System.out.println(element.getId()+" ");
        });
        System.out.println("<----------");

    }




    public void handleTextMessage(WebSocketSession session, TextMessage msg){
   // print();

        try{
            String stringPayload=msg.getPayload();
            System.out.println(stringPayload);
            Payload pl=om.readValue(stringPayload,Payload.class);

            String event=pl.getEventName();
            System.out.println(event);
            if(event.compareToIgnoreCase("left")==0){


            }
            else if(event.compareToIgnoreCase("stream")==0){

                //saving incoming Stream in Map
                Stream p=om.convertValue(pl.getData(),Stream.class);
                System.out.println(p.getStreamId()+" send our stream id");
                streamList.put(session.getId(),p.getStreamId());



            }

            else if(event.compareToIgnoreCase("camera")==0){

                //saving incoming Stream in Map
                Stream p=om.convertValue(pl.getData(),Stream.class);
               // System.out.println(p.getStreamId()+" send our camera status ");
                streamList.put(session.getId(),p.getStreamId());


                String data=om.writeValueAsString(new Stream(p.getStreamId(),p.getCameraStatus()));
                //breadcasting the leave of this person to others
                for(WebSocketSession singleSession: sessionList){

                    EventSender e=new EventSender("camera",data,singleSession);
                    e.emit();

                }



            }

            else if(event.compareToIgnoreCase("streamOff")==0){

                //saving incoming Stream in Map
                Stream p=om.convertValue(pl.getData(),Stream.class);
                // System.out.println(p.getStreamId()+" send our camera status ");
                streamList.put(session.getId(),p.getStreamId());


                String data=om.writeValueAsString(new Stream(p.getStreamId(),p.getCameraStatus()));
                //breadcasting the leave of this person to others
                for(WebSocketSession singleSession: sessionList){

                    EventSender e=new EventSender("streamOff",data,singleSession);
                    e.emit();

                }



            }


        }
        catch(Exception e){
            System.out.println(e.getMessage());
        }
    }


    @Override
    public void afterConnectionEstablished(WebSocketSession session) {

        //saving each new session
        sessionList.add(session);

        /************************

         /*
        print(sessionList);
        System.out.println(sessionList.size());*/

        System.out.println("Client connected: " + session.getId());
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws IOException {



        //filtering leaving sessions
        ArrayList<WebSocketSession> filtered=new ArrayList<>();
        String leaverStreamId=streamList.get(session.getId());



        for(WebSocketSession element:sessionList){
            if(element.getId().compareTo(session.getId())==0)continue;
            filtered.add(element);
        }
        sessionList=filtered;

        //**************************


        //acknowledging session destroyed to the frontend so the removal of the guests gets done correctly

        String data=om.writeValueAsString(new Stream(leaverStreamId,true));
        //breadcasting the leave of this person to others
        for(WebSocketSession singleSession: sessionList){

            EventSender e=new EventSender("left",data,singleSession);
            e.emit();
            EventSender e2=new EventSender("streamOff",data,singleSession);
            e2.emit();

        }
        //*********************************************

        //***************************************************************************************************


            print(sessionList);
        System.out.println(sessionList.size());
        System.out.println("Client disconnected: " + session.getId());
    }

}
