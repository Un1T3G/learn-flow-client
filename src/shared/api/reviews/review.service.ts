import { fetchAuth } from '../fetch'
import { ReviewDto, ReviewResponse } from './review.types'

class ReviewService {
  getStudentReviews() {
    return fetchAuth.get<ReviewResponse[]>('reviews/student')
  }

  createReview(reviewDto: ReviewDto, subjectId: string) {
    return fetchAuth.post<string>(`reviews/${subjectId}`, reviewDto)
  }
}

export const reviewService = new ReviewService()
