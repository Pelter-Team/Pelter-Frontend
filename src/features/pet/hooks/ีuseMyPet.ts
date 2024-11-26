import apiClient from "@/core/api/api";
import { APIError } from "@/core/api/error";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

interface Result {
  id: number;
  user_id: number;
  name: string;
  is_sold: boolean;
  is_verified: boolean;
  created_at: Date;
  updated_at: Date;
  description: string;
  category: string;
  subcategory: string;
}

export const useGetPets = () => {
  const fetchPets = async (): Promise<Result[]> => {
    try {
      const response = await apiClient.petRouter.getMyPets();
      return response.map((pet: any) => ({
        ...pet,
        created_at: new Date(pet.created_at),
        updated_at: new Date(pet.updated_at),
      }));
    } catch (error) {
      if (error instanceof APIError) {
        throw new Error(error.message);
      }
      throw error;
    }
  };

  const query: UseQueryResult<Result[], Error> = useQuery<Result[], Error>({
    queryKey: ["pets"],
    queryFn: fetchPets,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    error: query.error,
  };
};
