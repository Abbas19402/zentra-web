import useAxios from "@/shared/hooks/useAxios"
import { get } from "http"


const HomeServices = () => {
    const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
    const http = useAxios()
    
    async function getUserDetails(id: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/users/${id}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

 async function getComments(videoId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/comments/${videoId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

 async function addComment(videoId: string,userId: string, inComment: string) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/videos/add-comment/${videoId}/${userId}`,  { text: inComment })
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getAllVideos() {
        try{
            console.log("fetching all videos from", `${NEXT_PUBLIC_BACKEND_URL}/videos`)
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }
  /////////// here
    async function getLiveVideos() {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/lives/getallrooms`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function uploadVideo(formData: FormData) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/videos/upload`,formData)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getMyVideos(userId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/user/${userId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function likeVideo(videoOwnerId: string, videoId: string, loggedInUserId: string) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/likes/video/${videoId}/${videoOwnerId}`,{userId: loggedInUserId})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function saveVideo(userId: string, videoId: string, videoOwnerDetails: { videoOwnerId: string, videoOwnerName: string, videoOwnerUrl: string }) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/videos/save/${videoId}/${userId}`,{videoOwnerDetails})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

     async function savedVideos(userId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/mylist/${userId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function dislikeVideo(videoOwnerId: string, videoId: string, loggedInUserId: string) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/likes/video/dislike/${videoId}/${videoOwnerId}`,{userId: loggedInUserId})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getLikeStatus(videoId: string, loggedInUserId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/likes/${videoId}/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

       async function getSaveStatus(videoId: string, userId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/save-status/${videoId}/${userId}`)
            console.log(response,"ye wla")
            if(response.data == true) {
                return true
            }
            else return false
        } catch(e) {
            // Toasting here
        }
    }

    async function getLikedVideos(loggedInUserId: string) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/likes/videos/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function subscribe(CreatorId: string, loggedInUserId: string, checking: boolean) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/subscribe/${CreatorId}/${loggedInUserId}/${checking}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }
    ////////////////// now
        async function getSubscribedVideos(loggedInUserId: string) {
        try{
            const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/videos/subscribed-vids/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }
     
       async function endLive(roomId: string) {
        try{
            const response = await http.post(`${NEXT_PUBLIC_BACKEND_URL}/lives/endroom/${roomId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getRoomMetadata(roomId: string){
        try {
            console.log("getting room metadata for", roomId)
          const response = await http.get(`${NEXT_PUBLIC_BACKEND_URL}/lives/room-metadata/${roomId}`);
          return response.data;
        } catch (e) {
          // Toasting here
        }
    }

    return { getUserDetails, getAllVideos, uploadVideo, getMyVideos, likeVideo, getLikeStatus, dislikeVideo, getLikedVideos, getSaveStatus, saveVideo, getComments, addComment, savedVideos, subscribe, getSubscribedVideos, getLiveVideos, endLive, getRoomMetadata }
}

  


export default HomeServices