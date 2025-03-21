import React, { useState, useEffect } from "react";
import replyArrow from "../assets/reply.png";

const Comments = ({ taskId }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subComment, setSubComment] = useState("");
  const [replyingTo, setReplyingTo] = useState(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(
          `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
          {
            headers: {
              Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response:", data);
        setComments(data || []);
      } catch (error) {
        console.error("Error fetching comments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [taskId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubCommentChange = (e) => {
    setSubComment(e.target.value);
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) return;

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
          },
          body: JSON.stringify({ text: comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add comment");
      }

      const newComment = await response.json();
      setComments((prevComments) => [newComment, ...prevComments]);
      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleSubmitSubComment = async (parentCommentId) => {
    if (!subComment.trim()) return;

    console.log("Submitting sub-comment:", { parentCommentId, subComment });

    try {
      const response = await fetch(
        `https://momentum.redberryinternship.ge/api/tasks/${taskId}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer 9e74145e-719b-4838-9eef-0f916cac0f3b",
          },
          body: JSON.stringify({
            text: subComment,
            parent_id: parentCommentId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add sub-comment");
      }

      const newSubComment = await response.json();
      setComments((prevComments) => {
        return prevComments.map((comment) => {
          if (comment.id === parentCommentId) {
            return {
              ...comment,
              sub_comments: [...(comment.sub_comments || []), newSubComment],
            };
          }
          return comment;
        });
      });
      setSubComment("");
      setReplyingTo(null);
    } catch (error) {
      console.error("Error adding sub-comment:", error);
    }
  };

  const totalComments = comments.reduce((acc, comment) => {
    return acc + 1 + (comment.sub_comments ? comment.sub_comments.length : 0);
  }, 0);

  return (
    <div
      style={{
        width: "741px",
        height: "auto",
        position: "absolute",
        top: "230px",
        left: "1035px",
        borderRadius: "10px",
        border: "0.3px solid #DDD2FF",
        backgroundColor: "#F8F3FEA6",
        padding: "40px 45px",
        boxSizing: "border-box",
        zIndex: 1,
      }}
    >

      <div
        style={{
          width: "651px",
          height: "135px",
          borderRadius: "10px",
          border: "0.3px solid #ADB5BD",
          backgroundColor: "#FFFFFF",
          padding: "18px 20px 15px 20px",
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          boxSizing: "border-box",
        }}
      >
        <textarea
          placeholder="დაწერე კომენტარი"
          value={comment}
          onChange={handleCommentChange}
          style={{
            width: "100%",
            height: "100%",
            border: "none",
            outline: "none",
            resize: "none",
            fontFamily: "FiraGO, sans-serif",
            fontSize: "16px",
            lineHeight: "150%",
            color: "#0D0F10",
          }}
        />
        <button
          onClick={handleSubmitComment}
          style={{
            width: "155px",
            height: "35px",
            borderRadius: "20px",
            padding: "8px 20px",
            gap: "10px",
            backgroundColor: "#8338EC",
            color: "#FFFFFF",
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 400,
            fontSize: "16px",
            lineHeight: "100%",
            letterSpacing: "0%",
            border: "none",
            cursor: "pointer",
            alignSelf: "flex-end",
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.backgroundColor = "#B588F4";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.backgroundColor = "#8338EC";
          }}
        >
          დააკომენტარე
        </button>
      </div>

      <div
        style={{
          width: "172px",
          height: "24px",
          margin: "50px 0 40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 500,
            fontSize: "20px",
            lineHeight: "100%",
            letterSpacing: "0%",
            color: "#000000",
            margin: 0,
          }}
        >
          კომენტარები
        </h3>

        <span
          style={{
            width: "30px",
            height: "22px",
            borderRadius: "30px",
            backgroundColor: "#8338EC",
            color: "#FFFFFF",
            fontFamily: "FiraGO, sans-serif",
            fontWeight: 500,
            fontSize: "14px",
            lineHeight: "100%",
            letterSpacing: "0%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {totalComments}
        </span>
      </div>

      {loading ? (
        <div>Loading comments...</div>
      ) : comments.length > 0 ? (
        comments.map((comment) => (
          <div
            key={comment.id}
            style={{
              width: "598px",
              marginTop: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "flex-start" }}>
              <img
                src={comment.author_avatar}
                alt="User    Avatar"
                style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "40px",
                  marginRight: "10px",
                }}
              />
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span
                  style={{
                    fontFamily: "FiraGO",
                    fontWeight: 500,
                    fontSize: "18px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#021526",
                  }}
                >
                  {comment.author_nickname}
                </span>

                <p
                  style={{
                    fontFamily: "FiraGO",
                    fontWeight: 300,
                    fontSize: "16px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: "#343A40",
                    margin: 0,
                    padding: "12px 0",
                  }}
                >
                  {comment.text}
                </p>

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "67px",
                    height: "26px",
                    gap: "6px",
                    fontFamily: "FiraGO",
                    fontWeight: 300,
                    fontSize: "12px",
                    lineHeight: "100%",
                    letterSpacing: "0%",
                    color: isHovered ? "#B588F4" : "#8338EC",
                    cursor: "pointer",
                  }}
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  onMouseOver={() => setIsHovered(true)} 
                  onMouseOut={() => setIsHovered(false)} 
                >
                  <img
                    src={replyArrow}
                    alt="Reply"
                    style={{
                      width: "12px",
                      height: "12px",
                      filter: isHovered ? "brightness(0) saturate(100%) invert(71%) sepia(23%) saturate(1231%) hue-rotate(218deg) brightness(96%) contrast(95%)" : "none",
                    }}
                  />
                  <span>უპასუხე</span>
                </span>
              </div>
            </div>

            {comment.sub_comments && comment.sub_comments.length > 0 && (
              <div style={{ marginLeft: "48px" }}>
                {comment.sub_comments.map((subComment) => (
                  <div key={subComment.id} style={{ display: "flex", alignItems: "flex-start", gap: "10px", marginTop: "5px" }}>
                    <img
                      src={subComment.author_avatar}
                      alt="User    Avatar"
                      style={{
                        width: "38px",
                        height: "38px",
                        borderRadius: "40px",
                      }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <span
                        style={{
                          fontFamily: "FiraGO",
                          fontWeight: 500,
                          fontSize: "18px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: "#021526",
                        }}
                      >
                        {subComment.author_nickname}
                      </span>
                      <p
                        style={{
                          fontFamily: "FiraGO",
                          fontWeight: 350,
                          fontSize: "16px",
                          lineHeight: "100%",
                          letterSpacing: "0%",
                          color: "#343A40",
                          margin: 0,
                          padding: "12px 0 7px"
                        }}
                      >
                        {subComment.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {replyingTo === comment.id && (
              <div style={{ marginLeft: "48px", marginTop: "10px" }}>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                  }}
                >
                  <textarea
                    placeholder="დაწერე პასუხი"
                    value={subComment}
                    onChange={handleSubCommentChange}
                    style={{
                      width: "100%",
                      height: "60px",
                      border: "0.3px solid #ADB5BD",
                      borderRadius: "10px",
                      padding: "10px 60px 10px 10px",
                      fontFamily: "FiraGO, sans-serif",
                      fontSize: "16px",
                      lineHeight: "150%",
                      color: "#0D0F10",
                      resize: "none",
                      boxSizing: "border-box",
                      overflowY: "auto",
                    }}
                  />
                  <button
                    onClick={() => handleSubmitSubComment(comment.id)}
                    style={{
                      position: "absolute",
                      right: "15px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "transparent",
                      border: "none",
                      cursor: "pointer",
                      padding: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.querySelector("img").style.filter =
                        "brightness(0) saturate(100%) invert(71%) sepia(23%) saturate(1231%) hue-rotate(218deg) brightness(96%) contrast(95%)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.querySelector("img").style.filter = "none";
                    }}
                  >
                    <img
                      src={replyArrow}
                      alt="Reply"
                      style={{
                        width: "20px",
                        height: "20px",
                      }}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Comments;