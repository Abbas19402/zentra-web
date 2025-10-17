import HomeServices from '@/modules/home/services'

const useRequest = () => {
  return {
    home: HomeServices()
  }
}

export default useRequest