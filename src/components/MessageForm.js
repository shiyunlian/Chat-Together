import { useState } from "react";
import { sendMessage, isTyping } from "react-chat-engine";
import { SendOutlined, PictureOutlined } from "@ant-design/icons";

const MessageForm = (props) => {
  const [value, setValue] = useState(""); // initial value of the message is empty
  const { chatId, creds } = props; // destruct the things passing from props

  const handleChange = (event) => {
    setValue(event.target.value);
    isTyping(props, chatId);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // for every handleSubmit, it is nessary to add this method to prevent a browser refresh once the form submitted
    const text = value.trim(); //remove leading and trailing white spaces
    if (text.length > 0) sendMessage(creds, chatId, { text });
    setValue(""); // set the message value to be empty after pressing enter key
  };

  const handleUpload = (event) => {
    sendMessage(creds, chatId, { files: event.target.files, text: "" });
  };

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <input
        className="message-input"
        placeholder="send a message..."
        value={value}
        onChange={handleChange}
        onSubmit={handleSubmit}
      ></input>
      <label htmlFor="upload-button">
        <span className="image-button">
          <PictureOutlined className="picture-icon" />
        </span>
      </label>
      <input
        type="file"
        multiple={false}
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleUpload}
      ></input>
      <button type="submit" className="send-button">
        <SendOutlined className="send-icon" />
      </button>
    </form>
  );
};

export default MessageForm;
