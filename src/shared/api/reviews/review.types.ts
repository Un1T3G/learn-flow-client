export interface ReviewResponse {
  id: string
  comment: string
  score: number
  createdAt: string
  scheduleId: string
}

export interface ReviewDto {
  comment: string
  score: string
}
