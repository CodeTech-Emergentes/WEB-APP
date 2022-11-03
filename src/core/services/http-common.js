import axios from "axios";

export default axios.create({
    baseURL: "http://nutrix.eba-epdhbsvp.us-east-1.elasticbeanstalk.com/api/v1",
    //baseURL: "http://localhost:3000/api",
    headers: {"Content-type": "application/json"}
});