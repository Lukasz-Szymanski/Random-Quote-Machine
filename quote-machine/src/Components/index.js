import React, { useState, useEffect } from "react";
import "./styles.css";

const QuoteMachine = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();

      setQuote(data.content);
      setAuthor(data.author);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const handleTweetQuote = () => {
    const tweetText = encodeURIComponent(`"${quote}" - ${author}`);
    const tweetUrl = `https://twitter.com/intent/tweet?text=${tweetText}`;
    window.open(tweetUrl, "_blank");
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div id="quote-box">
      <div id="text">{quote}</div>
      <div id="author">{author}</div>
      <button id="new-quote" onClick={handleNewQuote}>
        New Quote
      </button>
      <button>
        <a
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${quote}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleTweetQuote}>
          Tweet Quote
        </a>
      </button>
    </div>
  );
};

export default QuoteMachine;
