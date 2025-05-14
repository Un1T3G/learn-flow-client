import { useMutation, useQuery } from '@tanstack/react-query'
import { ReviewDto, ReviewResponse, reviewService } from 'shared/api'
import { MutationOptions, QueryOptions } from 'shared/types'

export const reviewKeys = {
  student: ['reviews', 'student'],
  create: ['reviews', 'student', 'create'],
}

export const useStudentAllReviewsQuery = (
  options?: QueryOptions<ReviewResponse[]>
) => {
  return useQuery({
    queryKey: reviewKeys.student,
    queryFn: () => reviewService.getStudentReviews(),
    ...options,
  })
}

export const useCreateReviewMutation = (
  subjectId: string,
  options?: MutationOptions<string, Error, ReviewDto>
) => {
  return useMutation({
    mutationKey: reviewKeys.create,
    mutationFn: (reviewDto: ReviewDto) =>
      reviewService.createReview(reviewDto, subjectId),
    ...options,
  })
}
