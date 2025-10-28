import useAxios from "@/shared/hooks/useAxios"

const HomeServices = () => {
    const http = useAxios()
    
    async function getUserDetails(id: string) {
        try{
            const response = await http.get('http://localhost:8080/users/'+id)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

 async function getComments(videoId: string) {
        try{
            const response = await http.get('http://localhost:8080/videos/comments/'+videoId)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

 async function addComment(videoId: string,userId: string, inComment: string) {
        try{
            const response = await http.post('http://localhost:8080/videos/add-comment/'+videoId+'/'+userId,  { text: inComment })
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getAllVideos() {
        try{
            const response = await http.get('http://localhost:8080/videos')
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function uploadVideo(formData: FormData) {
        try{
            const response = await http.post('http://localhost:8080/videos/upload',formData)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getMyVideos(userId: string) {
        try{
            const response = await http.get('http://localhost:8080/videos/user/'+userId)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function likeVideo(videoOwnerId: string, videoId: string, loggedInUserId: string) {
        try{
            const response = await http.post('http://localhost:8080/likes/video/'+videoId+"/"+videoOwnerId,{userId: loggedInUserId})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function saveVideo(userId: string, videoId: string, videoOwnerDetails: { videoOwnerId: string, videoOwnerName: string, videoOwnerUrl: string }) {
        try{
            const response = await http.post('http://localhost:8080/videos/save/'+videoId+"/"+userId,{videoOwnerDetails})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

     async function savedVideos(userId: string) {
        try{
            const response = await http.get('http://localhost:8080/videos/mylist/'+userId)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function dislikeVideo(videoOwnerId: string, videoId: string, loggedInUserId: string) {
        try{
            const response = await http.post('http://localhost:8080/likes/video/dislike/'+videoId+"/"+videoOwnerId,{userId: loggedInUserId})
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function getLikeStatus(videoId: string, loggedInUserId: string) {
        try{
            const response = await http.get(`http://localhost:8080/likes/${videoId}/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

       async function getSaveStatus(videoId: string, userId: string) {
        try{
            const response = await http.get(`http://localhost:8080/videos/save-status/${videoId}/${userId}`)
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
            const response = await http.post(`http://localhost:8080/likes/videos/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }

    async function subscribe(CreatorId: string, loggedInUserId: string, checking: boolean) {
        try{
            const response = await http.get(`http://localhost:8080/videos/subscribe/${CreatorId}/${loggedInUserId}/${checking}`)
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
            const response = await http.get(`http://localhost:8080/videos/subscribed-vids/${loggedInUserId}`)
            if(response) {
                return response.data
            }
        } catch(e) {
            // Toasting here
        }
    }
    


    return { getUserDetails, getAllVideos, uploadVideo, getMyVideos, likeVideo, getLikeStatus, dislikeVideo, getLikedVideos, getSaveStatus, saveVideo, getComments, addComment, savedVideos, subscribe, getSubscribedVideos }
}




export default HomeServices