import mongoose from "mongoose";
import PostMessage from "../models/postsMessage.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import _ from "lodash";
import admin from "firebase-admin";

const OpenAPIKey = "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";
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "mohammadahmed.kips@gmail.com",
    pass: "ixurzaonkmculdtp"
  }
});

const serviceAccount = {
  type: "service_account",
  project_id: "gcu-society-hub",
  private_key_id: "df2d42e4b754c1a642fcf6f8a71d0df7021df547",
  private_key:
    "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC+TBi1QDhET24P\nrpyJkh9en6F12/t7Q4nm2gOyY3TtcrCSpOttx1O6ittdZaV5NwWWLEu7RrT4e+Be\njTknP2+etusCfq5cj8GyN+YIT4Q9BFzgVIZU8Qw1+P9qjNHNOt2YgYFRqW3z4s37\nCghDU16EDQSVkYx9dXYIPyrG/mOKU/DE4C/0NTfqEgRX5vQ3fceAHlXp16EVWfSP\nrTRNFfUhBrlE+V0TJjzoyMhU0anhJxGahFiEDOesBXUcvKgA0GO/6rhOagkpOLxq\n5hLcjefdInjV7BYK/oy4Z3MHqBSp8N2twCxR1jkjdr6I/UsptL91VDAgQg20857T\nqznSAIFdAgMBAAECggEAKhZ9AXtwZmVV75h8LS4ZC43NQVqz0nWj1p/B4Q6/sfOj\ni2931YoYIeIrtcqxMC/D58yovEUdafbF70uXSC+u0YDd1emsSTMPUUotMYnasr8Y\nBpKTOk6s13QYk5mNHnHGSIBeGHBbbe0sBvmXTcKu3RBfAvCTzLyxrA3CeYwSemmI\nLDmNQfwamxF77awPcXwNg0uDmwWmsYgliZz+RfOg6tJ0Yp0mJVeOZNN2bYgb8Z5T\nNpEPRthuvtF28EI9Kv01ekH/ATcij7xqquXG23MTiQxol4a3K0T3T7694IJEtTA4\nB44K3s5nr0UyJcrsXrUpq9AjX9Ma4V2XR4LWj1oBOQKBgQDee7o8nkTnrij/7t57\nKvyrVnHt4yVnzxHO+seKBnyxjBJLLG6WT1Nq3n1rSt0KEaREpYKwRErOQ4Bwm5o1\nAbzzgNpvr20ORvl7qVk/DguMQmaeJS6Wn4WF62CsKb3BPGCvqVMHLZnmWZCIVNS2\nWx50UXCQaPadv1i6Y7iOwOYSdQKBgQDa9xWPl2LXuMD7oTXX52bg0paVNCyyzzOX\niKy+cRyfzFW8unZ2BnYiACjASKPl6OUKqN8Yp0KXB9PgWgdabfY7MizweQx23afM\nQlx/FIQ0J7Wc4ogV8Nd5i1r8KkAfOJ14fKN27RUgzIYsiwaTUjNUPaE9VThphtUL\nfnoWSEyGSQKBgQCBgdpOEP8hMcMR//UoE0TTY9Wb2T5b6DCAoIBouw/4tgWsFqgk\n/PYc3nh5bTGv+8b4YrPpcUduO+LXKeyg8GsR/66nlqFPz0bIkjKuPrnAIqLjaddt\nvFwYMYSrkvyvMDtD5be8FPJiIT697UuI/w+CPCnfFgqAlvLKROQYzPbgRQKBgQDM\n5+YsXn2n5APsNhtd9PUoNMmnzJB7sDzWdJc7DDy+KYieOVv77OYFwWJhNljyILSd\n+hP0TSmajj+vNnClJjwDf1vgmVaZsamCEyPd5EQnTnW835x788qgulEloyAoV2G9\nS93ov8pCzEJPUraPjJ/uGFJYQ/Srg/rAa9YyHexGyQKBgQCIH9YgIQuK9/rZ5baB\nXMM29z2dqL1nqLKbeafHVdD8cdmYY+S5t60U9aRpsW4cX0sFgeBjFzkUCXp6aWcu\n283Z6WbKjujqTkz9p508owcaRruzRBcNot+HhN8DqyTOuvIv+Ldd4Ev4sDa6/kMs\nO2XAzKvjOfLU726zT4UYULDPcQ==\n-----END PRIVATE KEY-----\n",
  client_email: "firebase-adminsdk-yz5hn@gcu-society-hub.iam.gserviceaccount.com",
  client_id: "105862286900035248784",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-yz5hn%40gcu-society-hub.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export const sendPushNotifications = async (tokesList, title, body) => {
  const message = {
    notification: {
      title,
      body
    }
  };
  const sendPromises = tokesList.map(token => {
    message.token = token;
    return admin.messaging().send(message);
  });
  Promise.all(sendPromises)
    .then(responses => {
      responses.forEach((response, index) => {
        console.log(`Notification sent to ${tokesList[index]}:`, response);
      });
    })
    .catch(error => {
      console.error("Error sending notifications:", error);
    });
};

async function sendTextToOpenAI(text) {}

export const openAPIChatBot = async (req, res) => {
  try {
    const response = await sendTextToOpenAI(req.body.text);
    res.status(200).json({reply: response});
  } catch (err) {
    console.error(err);
    res.status(404).json({error: "Error connecting to OpenAI."});
  }
};

export const getPosts = async (req, res) => {
  try {
    const postMessages = await PostMessage.find().lean();
    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({meesage: error.meesage});
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postID = req.params.id;
    console.log(postID);
    const postMessages = await PostMessage.findById(postID);

    res.status(200).json(postMessages);
  } catch (error) {
    res.status(404).json({meesage: error.meesage});
  }
};

export const createPost = async (req, res) => {
  const post = req.body;
  const newPost = new PostMessage(post);
  const department = post.department;
  const selectedDepartmentStudent = await User.find({department: department}).select({email: 1, _id: 0, deviceToken: 1}).lean();
  const emails = _.map(selectedDepartmentStudent, "email");
  const deviceTokenList = _.compact(_.map(selectedDepartmentStudent, "deviceToken"));

  // Email content
  const mailOptions = {
    from: "GCUSocietyHub@gmail.com",
    to: emails.join(", "), // Join recipients with a comma and space
    subject: "Announcement by GCU Society Hub",
    text: post.message
  };

  // // Send the email
  debugger;
  try {
    const info = await transporter.sendMail(mailOptions);
    sendPushNotifications(deviceTokenList, "Announcement by GCU Society Hub", post.message);
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({meesage: error.meesage});
  }
};

export const updatePost = async (req, res) => {
  const {id: _id} = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, {...post, _id}, {new: true});

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const {id} = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with that id");

  await PostMessage.findByIdAndRemove(id);

  res.json({message: "Post deleted successfully!"});
};

export const departmentBasedPost = async (req, res) => {
  const {department} = req.params;

  const result = await PostMessage.find({department: department});

  if (result.length === 0) return res.status(404).send("No post with that department");

  res.json(result);
};
