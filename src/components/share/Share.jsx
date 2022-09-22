import "./share.css"
import { useContext, useState, useRef } from "react";
import {AuthContext} from "../../context/AuthContext"
import { Cancel } from "@mui/icons-material";
import { PermMedia, Label, Room, EmojiEmotions } from "@mui/icons-material";
import {axiosInstance} from "../../config"
export default function Share() {
    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file,setFile] = useState(null)
    const desc = useRef()
    const submitHandler=async (e)=>{
      e.preventDefault()
      const newPost={
        userId:user._id,
        desc:desc.current.value
      }
      if (file) {
        const data = new FormData();
        const fileName = Date.now() + file.name;
        data.append("name", fileName);
        data.append("file", file);
        newPost.img = fileName;
        console.log(newPost);
        try {
          await axiosInstance.post("/upload", data);
        } catch (err) {}
      }
      try{
        await axiosInstance.post("/posts",newPost)
        window.location.reload()
      }catch(err){
        console.log(err);
      }
      
    }
    return (
      <div className="share">
        <div className="shareWrapper">
          <div className="shareTop">
            <img
              src={user.profilePicture?PF+user.profilePicture:PF+"/person/noAvatar.png"}
              alt=""
              className="shareProfileImg"
            />
            <input
              type="text"
              placeholder={"What's in your mind "+user.username+" ?"}
              className="shareInput"
              ref={desc}
            />
          </div>
          <hr className="shareHr" />
          {file && (
            <div className="shareImgContainer">
              <img src={URL.createObjectURL(file)} class="shareImg"  alt="" />
              <Cancel className="shareCancelImg" onClick={()=>setFile(null)}/>
            </div>
          )}
          <form className="shareBottom" onSubmit={submitHandler}>
            <div className="shareOptions">
              <label className="shareOption" htmlFor="file">
                <PermMedia htmlColor="tomato" className="shareIcon" />
                <span className="shareOptionText">Photo or Video</span>
                <input style={{display:"none"}} type="file" id="file" accept=".jpg,.png,.jpeg" onChange={(e)=>setFile(e.target.files[0])} />
              </label>
              <div className="shareOption">
                <Label htmlColor="blue" className="shareIcon" />
                <span className="shareOptionText">Tag</span>
              </div>
              <div className="shareOption">
                <Room htmlColor="green" className="shareIcon" />
                <span className="shareOptionText">Location</span>
              </div>
              <div className="shareOption">
                <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                <span className="shareOptionText">Feelings</span>
              </div>
            </div>
            <button className="shareButton" type="submit">Share</button>
          </form>
        </div>
      </div>
    );
}
