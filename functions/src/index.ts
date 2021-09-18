import * as functions from "firebase-functions";
import {Application} from "express";
import FaunaDbHelper, {DB_COLLECTION, DB_INDEX, FaunaData} from "./FaunaDbHelper";
import {UserModelInterface} from "../../src/models/User";
import {ProjectLocal, ProjectModelInterface} from "../../src/models/Project";
import Utils from "./Utils";

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const PORT = process.env.PORT;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const express = require('express');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

const app:Application = express();

// const main = express();
// main.use('/api/v1', app);
// main.use(bodyParser.json());
// main.use(bodyParser.urlencoded({ extended: false }));
// Automatically allow cross-origin requests
app.use(cors({origin: true}));
app.use(express.json());
// app.use(cors())
app.use(express.urlencoded({
  extended: false,
}));

// Add middleware to authenticate requests
// app.use(myMiddleware);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

app.post("/register/user", async (request, response) => {
  try {
    const user: UserModelInterface = request.body as unknown as UserModelInterface;

    if (!(user.email && user.displayName && user.uid)){
    // TODO: Handle
      response.status(500).send("User info Missing");
      return;
    }
      // user.id = Utils.generateUId();
      // console.log("about to start");
      const fauna = new FaunaDbHelper();
   fauna.Create<UserModelInterface>(DB_COLLECTION.USERS, user).catch((reason)=> {
        response.send({error: true, message: "Make sure your providing all the information and", reason: `${reason}`});
        return;
      }).then((result) => {
       response.status(200).send((result as FaunaData).data);
   });


  }catch(e){
    // prepareResponse(e ,response,true)
    // console.log(e);
    // console.log("something went wrong");
    response.send({error: true, message: "something went wrong", reason: `${e}`});

  }
});

app.post("/register/project", async (request, response) => {
  try {
    const body = request.body;
    body.localization = JSON.parse(body.localization as string) as Array<ProjectLocal>;

    if (!(body.title && body.owner)){
    // TODO: Handle
      response.status(500).send("Project info Missing");
      return;
    }
      (body as ProjectModelInterface).ref = Utils.generateRef();
      // console.log("about to start");
      const fauna = new FaunaDbHelper();
   fauna.CreateWithCustomRef<ProjectModelInterface>(DB_COLLECTION.PROJECT, body, (body as ProjectModelInterface).ref!).catch((reason)=> {
        response.send({error: true, message: "Make sure your providing all the information and", reason: `${reason}`});
        return;
      }).then((result) => {
       response.status(200).send((result as FaunaData).data);
   });


  }catch(e){
    // prepareResponse(e ,response,true)
    // console.log(e);
    // console.log("something went wrong");
    response.send({error: true, message: "something went wrong", reason: `${e}`});

  }
});

app.post('/user/:uid', async (request, response)=>{
    try {
      const uid = request.params['uid'];
      if(!uid){
          response.send("UID is required");
          return;
      }

       const fauna = new FaunaDbHelper();
       const result = await fauna.LoadByIndexBy<UserModelInterface>(DB_INDEX.USER_BY_UID, uid);
        response.status(200).send(result);
        return;
    } catch (e) {
      response.send({error: true, message: "something went wrong", reason: `${e}`});
      return;

    }
});
app.post('/user/:uid/projects', async (request, response)=>{
    try {
      const uid = request.params['uid'];
      if(!uid){
          response.send("UID is required");
          return;
      }

       const fauna = new FaunaDbHelper();
       const result = await fauna.GetByIndex<ProjectModelInterface>(DB_INDEX.PROJECT_OWNER_UID, uid);
        response.status(200).send(result);
        return;
    } catch (e) {
      response.send({error: true, message: "something went wrong", reason: `${e}`});
      return;

    }
});


// export const webApi = functions.https.onRequest(main);
app.listen(PORT, ()=> console.log(`API http://localhost:${PORT}`));