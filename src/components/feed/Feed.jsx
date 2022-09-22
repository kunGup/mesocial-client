import "./feed.css"
import Share from "../share/Share"
import Post from "../post/Post"
import {axiosInstance} from "../../config"
import { useState, useEffect, useContext } from "react";
import {AuthContext} from "../../context/AuthContext"
export default function Feed({username}) {
    const {user} = useContext(AuthContext)
    const [posts,setPosts]=useState([])
    useEffect(() => {
      const fetchPosts = async () => {
        const res = username
          ? await axiosInstance.get("/posts/profile/" + username)
          : await axiosInstance.get("/posts/timeline/" + user._id);
        setPosts(res.data.sort((p1,p2)=>{
          return new Date(p2.createdAt)-new Date(p1.createdAt)
        }));
      };
      fetchPosts();
    }, [username, user._id]);
    return (
      <div className="feed">
        <div className="feedWrapper">
          {/* doubt */}
          {(!username || username === user.username) && <Share />}
          {posts.map((p) => (
            <Post key={p._id} post={p} />
          ))}
        </div>
      </div>
    );
}
