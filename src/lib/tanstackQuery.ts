import { useQuery } from '@tanstack/vue-query'
//@ts-expect-error
import { getData } from '@/lib/CRUD.js'

const handleQuery = (key: string, url: string, refetch: boolean = false) => {
  // console.log('refetch', typeof refetch)
  const { isFetching, data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await getData(url)
    },
    refetchOnMount: refetch ? true : false,
    staleTime: refetch ? 0 : 5000
  })

  return { data, isFetching, error, isLoading }
}

export { handleQuery }
