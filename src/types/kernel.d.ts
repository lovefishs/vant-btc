// response
interface ApiPageParams {
  pageNum: number
  pageSize: number
}

interface ApiResultError {
  code: string
  message: string
  cause: any
  description: any
}

interface ApiListData<T = any> {
  list: T[]
  total: number
  totalPage: number
  pageNum: number
  pageSize: number
}

interface ApiResponse<T = any> {
  data: T
  code: number
  message: string
  success: boolean
  error?: ApiResultError
}

interface ApiListResponse<T = any> extends Omit<ApiResponse, 'data'> {
  data: ApiListData<T>
}
