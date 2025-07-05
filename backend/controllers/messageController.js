const conversationModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const { getReceiverSocketId } = require('../sokcetIO/server'); // Import the function to get receiver's socket ID
const { io } = require('../sokcetIO/server'); // Import the socket.io instance

exports.sendMessage = async (req, res) => {
    try {
        const message = req.body.message;
        const receiverId = req.params.id;
        const senderId = req.user._id; // current loggedIn user

        let conversation = await conversationModel.findOne({
            members: { $all: [senderId, receiverId] } //member array of conversationmodel contains sender and receiver Id or not.
        });

        if (!conversation) {
            // If conversation does not exist, create a new one
            conversation = await conversationModel.create({
                members: [senderId, receiverId],
            });
        }

        const newMessage = new messageModel({
            receiverId,
            senderId,
            message,
        });

        if (newMessage) {
            conversation.messages.push(newMessage._id); // Add the new message to the conversation's messages array

        }

        // await newMessage.save();
        // await conversation.save();

        // hm dono ko ek hi baar save krenge
        await Promise.all([
            newMessage.save(),
            conversation.save()
        ]);

        // Emit the message to the receiver using socket.io
        const receiverSocketId = getReceiverSocketId(receiverId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }

        res.status(200).json({
            message: "Message sent successfully",
            newMessage
        });


    } catch (error) {
        console.error("Error sending message:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

exports.getMessages = async (req, res) => {
    try {
        const chatuserId = req.params.id; // reciever ID hi hai
        const senderId = req.user._id; // current loggedIn user

        // Find the conversation between the sender and receiver
        const conversation = await conversationModel.findOne({
            members: { $all: [senderId, chatuserId] } // Check if both sender and receiver are in the conversation
        }).populate('messages'); // Populate the messages field of conversationmodel with actual message documents from messageModel.
        //Mtlb ki agr sender aur receiver hai to uska messages array me jo bhi message id hai usko use krkre messageModel se dundho message ko aur populate kro.

        if (!conversation) {
            return res.status(201).json([]);
        }

        const messages = conversation.messages; // Get the messages array from the conversation

        res.status(200).json(messages);
    } catch (error) {
        console.error("Error in getMessages:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}