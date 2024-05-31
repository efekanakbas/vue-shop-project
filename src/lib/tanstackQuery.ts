import { useQuery } from '@tanstack/vue-query'
//@ts-expect-error
import { getData } from '@/lib/CRUD.js'

const handleQuery = (key: string, url: string) => {
  const { isFetching, data, isLoading, error } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await getData(url)
    }
  })

  return { data, isFetching, error, isLoading }
}

export { handleQuery }
