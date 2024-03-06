import { useState, createContext } from "react";

export const PostContext = createContext(null);

function PostCont ({children}){
    const [postDetails,setPostDetails] = useState()
    return(
        <PostContext.Provider value={{postDetails,setPostDetails}}>
            {children}
        </PostContext.Provider>
    )
}

export default PostCont