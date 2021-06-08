import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessages";

const ChatFeed = (props) => {
  const { chats, activeChat, userName, messages } = props; // destruct the things from props

  const chat = chats && chats[activeChat]; // check if the chats exist

  /*
Chat Object
id (int) - Unique primary key to identify this chat
admin (String) - Unique username of the person who created this chat
title (String) - Optional title of this chat
created (Datetime) - Date-time of chat creation
people (Array) - Array of people added to this chat
   
Message Object
id (int) - Unique primary key to identify this message
sender (String) - Unique username of the person who sent this message
text (String) - Contents of the message sent
created (Datetime) - Date-time of message creation

*/
  const renderReadReceipts = (message, isMyMessage) => {
    return chat.people.map((person, index) => {
      person.last_read === message.id && (
        <div
          key={`read_${index}`}
          className="read-receipt"
          style={{
            float: isMyMessage ? "right" : "left",
            backgroundImage: person.avatar && `url(${person.avatar})`,
          }}
        ></div>
      );
    });
  };

  const renderMessages = () => {
    const keys = Object.keys(messages);

    return keys.map((key, index) => {
      const message = messages[key];
      const lastMessageKey = index === 0 ? null : keys[index - 1];
      const isMyMessage = userName === message.sender.username;
      return (
        <div key={`msg_${index}`} style={{ width: "100%" }}>
          <div className="message-block">
            {isMyMessage ? (
              <MyMessage message={message} />
            ) : (
              <TheirMessage
                message={message}
                lastMessage={messages[lastMessageKey]}
              />
            )}
          </div>
          <div
            className="read-receipts"
            style={{
              marginRight: isMyMessage ? "18px" : "0px",
              marginLeft: isMyMessage ? "0px" : "68px",
            }}
          >
            {renderReadReceipts(message, isMyMessage)}
          </div>
        </div>
      );
    });
  };

  if (!chat) return "Loading...";

  return (
    <div className="chat-feed">
      <div className="chat-title-container">
        <div className="chat-title">{chat.title}</div>
        <div className="chat-subtitle">
          {chat.people.map((person) => `${person.username}`)}
        </div>
      </div>
      {renderMessages()}
      <div style={{ height: "100%" }}></div>
      <div className="message-form-container">
        <MessageForm {...props} chatId={activeChat} />
      </div>
    </div>
  );
};

export default ChatFeed;
