import { createChatBotMessage } from "react-chatbot-kit";

const config = {
    botName: "GCU Bot",
    initialMessages: [
        createChatBotMessage("Hi, how can I help you?"),
    ],
    customStyles: {
        botMessageBox: {
            backgroundColor: "#376B7E",
        },
        chatButton: {
            backgroundColor: "#376B7E",
        },
    }
};

export default config;