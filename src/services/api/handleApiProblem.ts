import { ApiResponse } from 'apisauce';
import { GeneralApiProblem, getGeneralApiProblem } from './apiProblem'

export async function handleApiProblem(response: ApiResponse<any>): Promise<GeneralApiProblem & { message?: string }> {
  const problem = await getGeneralApiProblem(response);
  if (problem)
    return {
      ...problem,
      message: response.data?.message || `Error, ${response.originalError.response.status}`,
    };

  return problem;
}
