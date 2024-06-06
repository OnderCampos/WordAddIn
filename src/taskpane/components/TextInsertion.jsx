import * as React from "react";
import { useState } from "react";
import {
  Field, Textarea, makeStyles, Button, Label, Tooltip, Card,
  CardPreview,
} from "@fluentui/react-components";
import generate from "../chatbot"; 
import buildResponse from "../word";
import { ArrowSyncFilled, ArrowRightRegular, ArrowLeftRegular, EditRegular } from "@fluentui/react-icons";
import { ColorChangingLoading } from "./ColorChangingLoading";
import Header from "./Header";

const useStyles = makeStyles({
  textPromptAndInsertion: {
    paddingTop: "10px",
    marginRight: "10px",
    marginLeft: "10px",
    flexDirection: "column",
    alignItems: "center",
  },

  box: {
    width: "300px",
    h1: {
      fontSize: "20px",
      margin: "0 0 1rem 0",
    }
  },
  bottomCard: {
    paddingTop: "10px",
    paddingRight: "10px",
    paddingLeft: "10px",
    marginLeft: "10px",
    marginRight: "10px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row"
  },
  buttonP: {
    marginRight: "5px",
    backgroundColor: "#2D5871",
    borderColor: "#2D5871",
    color: "#ffffff",
    fontWeight: "bold",
    borderRadius: "15px",
    padding: "10px",
    width: "100px",
    '&:hover': {
      backgroundColor: "#245266",
      borderColor: "#245266"
    }
  },

  reloadButton: {
    backgroundColor: "#fff !important",
    borderColor: "#fff !important",
    color: "#2D5871 !important",
    boxShadow: "0px 0px 10px 1px #EDEDED"
  },

  icon: { fontSize: "24px" },
  count: {
    marginRight: "4px",
    marginLeft: "4px",
    marginTop: "15px",
    fontSize: "20px"
  },

  slideButtons: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },

  textarea: {
    marginRight: "15px",
    marginLeft: "15px",
    paddingRight: "15px",
    height: "100px"
  },
  card: {
    marginTop: "15px",
    marginLeft: "15px",
    marginRight: "15px",
    paddingRight: "20px"
  }

});

const TextInsertion = () => {
  const [text, setText] = useState("");
  const [responses, setResponses] = useState([])
  const [responsesCount, setRepsonsesCount] = useState(0)
  const [promptText, setPromptText] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  async function handleTextInsertion() {
      setIsLoading(true)
      var response = await generate(promptText)
      await buildResponse(response)
      setIsLoading(false)
  }

  const handlePromtText = async (event) => {
    setPromptText(event.target.value);
  };


  const nextText = () => {
    var newState = responsesCount + 1
    if (newState < responses.length) {
      setRepsonsesCount(newState)
      setText(responses[newState]["prompt"])
      setTextStyleValue(responses[newState]["text_style"])
      setTextAligmentValue(responses[newState]["text_aligment"])
    }
  }

  const prevText = () => {
    var newState = responsesCount - 1
    if (newState >= 0) {
      setRepsonsesCount(newState)
      setText(responses[newState]["prompt"])
      setTextStyleValue(responses[newState]["text_style"])
      setTextAligmentValue(responses[newState]["text_aligment"])
    }
  }

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
      {isLoading && <ColorChangingLoading/>}
      <Card>
      <Header
        logo={"assets/icon_frida_azul.svg"}
        title={""}
        message={'Welcome to FRIDA\'s LLM powered assistant'}
      />
        <CardPreview>
          <div className={styles.card}>
            <div className='Row'>
              <Label size="large"> <EditRegular className={styles.icon} />
                What would you like to generate?
              </Label>
             

              <Field size="large" appearance="filled-darker" label="Prompt">
                <Textarea value={promptText} className={styles.textarea} onChange={handlePromtText} />
              </Field>
            </div>
            <div className={styles.bottomCard}>
              <div className={styles.slideButtons}>
                <Tooltip content="Last prompt" relationship="label">
                  <Button onClick={prevText} appearance="transparent" shape="rounded" size="small" icon={<ArrowLeftRegular />} />
                </Tooltip>
                <p className={styles.count}>{responses.length}</p>
                <Tooltip content="Next prompt" relationship="label">
                  <Button onClick={nextText} appearance="transparent" shape="rounded" size="small" icon={<ArrowRightRegular />} />
                </Tooltip>
              </div>
              <div>
                <Button size="large" shape="rounded" className={styles.buttonP} onClick={handleTextInsertion}>Generate</Button>
                <Tooltip content="Large with calendar icon only" relationship="label">
                  <Button shape="rounded" size="large" icon={<ArrowSyncFilled />} />
                </Tooltip>
              </div>
            </div>
          </div>
        </CardPreview>
      </Card>
    </div>
  );
};

export default TextInsertion;
