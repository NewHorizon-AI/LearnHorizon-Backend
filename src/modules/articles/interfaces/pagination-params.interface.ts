export interface IPaginationParams {
  page: number
  limit: number
  sort: string
  filters?: Record<string, any>
}
