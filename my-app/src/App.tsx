import { useEffect, useState } from "react";
import { sendMessage } from "./api";


function App() {
  const [delayInput, setDelayInput] = useState(0);
  const [delayUnit, setDelayUnit] = useState("");
  const [slackMessage, setSlackMessage] = useState("");
  const [slackHookURL, setSlackHookURL] = useState("");
  const [buttonMessage, setButtonMessage] = useState("Send");
  const [isSubmitDisabled, setSubmitDisabled] = useState(true);

  useEffect(() => {
    const message = getButtonDynamicMessage(delayInput, delayUnit);
    setButtonMessage(message);
  }
    , [delayInput, delayUnit]);

  useEffect(() => {
    const isDisabled = delayInput <= 0 || delayUnit === "" || slackMessage === "" || slackHookURL === "";
    setSubmitDisabled(isDisabled);
  }, [delayInput, delayUnit, slackMessage, slackHookURL]);

  function getButtonDynamicMessage(delayInput: number, delayUnit: string) {
    if (delayInput === 0 || delayUnit === "") {
      return "Send";
    }
    if (delayInput > 0 && delayUnit !== "") {
      return `Send in ${delayInput} ${delayUnit}`;
    }
    return "Send";
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const delayInMilliseconds = convertDelayToMilliseconds(delayInput, delayUnit);
    setButtonMessage("Sending...");
    setSubmitDisabled(true);
    setTimeout(() => {
      const formattedMessage = `From James Nikko Seva's Slack Bot: ${slackMessage}`;
      sendSlackMessage(formattedMessage, slackHookURL);
      setButtonMessage("Sent!");
      setSubmitDisabled(false);

    }, delayInMilliseconds);
  }

  function convertDelayToMilliseconds(delayInput: number, delayUnit: string) {
    switch (delayUnit) {
      case "seconds":
        return delayInput * 1000;
      case "minutes":
        return delayInput * 60 * 1000;
      case "hours":
        return delayInput * 60 * 60 * 1000;
      default:
        return 0;
    }
  }
  async function sendSlackMessage(message: string, slackHookURL: string) {
    await sendMessage(message, slackHookURL)
  }


  return (

    <>



      <div className="form-container">
        <h1>First Mate Coding Challenge</h1>
        <form onSubmit={onSubmit}>
          <div>
            <label>Delay input:</label>
            <input type="number" placeholder="Enter delay amount" className="" name="delayInput" onChange={(e) => setDelayInput(+e.target.value)} />
          </div>
          <div>
            <label>Delay unit:</label>
            <select name="delayUnit" className="" onChange={(e) => setDelayUnit(e.target.value)}>
              <option value="">Select delay unit</option>
              <option value="seconds">Seconds</option>
              <option value="minutes">Minutes</option>
              <option value="hours">Hours</option>
            </select>
          </div>
          <div>
            <label>Slack Message input:</label>
            <input type="text" placeholder="Enter your message" className="" name="messageInput" onChange={(e) => setSlackMessage(e.target.value)} />
          </div>
          <div>
            <label>Slack Hook URL input:</label>
            <input type="text" placeholder="Enter your slack hook URL" className="" name="slackHookInput" onChange={(e) => setSlackHookURL(e.target.value)} />
          </div>

          <button type="submit" className="submit-button" disabled={isSubmitDisabled}>{buttonMessage} </button>
        </form>
      </div>

    </>
  );
}

export default App;
