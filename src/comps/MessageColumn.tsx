import {onMessage, removeHandler} from "@/lib/discord";
import {Message} from "discord.js";
import * as React from "react";
import {useEffect} from "react";

type MessageColumnProps = {
  targetId: string;
}
export const MessageColumn: React.FC<MessageColumnProps> = ({targetId}) => {
  const [message, setMessage] = React.useState<Message[]>([]);

  useEffect(() => {
    onMessage(targetId, (e: Message) => { setMessage([...message, e])});
    return () => { removeHandler(targetId); }
  });

  return (
    <div>
      {message.map(
        (value, index) => (
          <div key={index}>
            {value.content};
          </div>
        )
      )}
    </div>
  );
}
