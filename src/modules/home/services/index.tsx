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
    
    return { getUserDetails, getAllVideos, uploadVideo, getMyVideos, likeVideo, getLikeStatus, dislikeVideo, saveVideo, savedVideos, getSaveStatus }
}



export default HomeServices