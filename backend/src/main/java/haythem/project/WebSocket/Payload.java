package haythem.project.WebSocket;


public class Payload {

    private String eventName;

    private Object data;

    public String getEventName() {
        return eventName;
    }

    public Object getData() {
        return data;
    }

    public Payload(String eventName, Object data) {
        this.eventName = eventName;
        this.data = data;
    }public Payload(String eventName) {
        this.eventName = eventName;
    }

    public Payload(Object data) {
        this.data = data;
    }
    public Payload(){

    }
}
