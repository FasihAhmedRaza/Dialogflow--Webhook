const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion , Payload} = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 3001;

app.post("/dialogflow", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function hi(agent) {
        console.log(`intent  =>  hi`);
        agent.add("hi this dialogflow response")

        const payload = {
            "richContent": [
              [
                {
                  "options": [
                    {
                      "text": "Dr. Issa Nagari"
                    },
                    {
                      "text": "Prof. Amir"
                    },
                    {
                      "text": "Dr. Jhon patrick"
                    },
                    {
                      "text": "Sara kirchoff"
                    },
                    {
                      "text": "location"
                    }
                  ],
                  "type": "chips"
                }
              ]
            ]
          }
          agent.add(
            new Payload(agent.UNSPECIFIED, payload, {
              rawPayload: true,
              sendAsMessage: true,
            })
          );
    }

    // function sendNotes(agent) {
    //     const { number , date , email} = agent.parameters;
    //    agent.add("")
    // }

    let intentMap = new Map();
    intentMap.set('hi', hi); 
    // intentMap.set('sendNotes', sendNotes);
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});