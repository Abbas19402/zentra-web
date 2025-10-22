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
    
    return { getUserDetails, getAllVideos, uploadVideo, getMyVideos, likeVideo, getLikeStatus, dislikeVideo }
}

export default HomeServices