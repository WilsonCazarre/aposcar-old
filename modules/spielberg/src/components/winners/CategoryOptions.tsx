import React from "react";
import { Category, CategoryDetail } from "../../utils/apiEntities";
import { useQuery, useQueryClient } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosResponse } from "axios";
import Loader from "react-loader-spinner";
import useDefaultMutation from "../../utils/useDefaultMutation";
import useAuth from "../../utils/useAuth";
import { useForm } from "react-hook-form";
import Button from "../Button";

interface Props {
  category: Category;
}

interface FormFields {
  indicationId: number;
}

const CategoryOptions: React.FC<Props> = ({ category }) => {
  const { loggedUser } = useAuth();
  const { data, isLoading } = useQuery<AxiosResponse<CategoryDetail>>(
    ["category", category.urlField],
    () => kubrick.get(`categories/${category.urlField}/`),
    { onSuccess: (data1) => console.log(data1) }
  );
  const { handleSubmit, register } = useForm<FormFields>();
  const queryClient = useQueryClient();
  const submitGuessMutation = useDefaultMutation<FormFields>(
    `users/${loggedUser?.username}/guess/`,
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries(["users", loggedUser?.username]);
        await queryClient.invalidateQueries("categories");
        await queryClient.invalidateQueries("users");
      },
    }
  );
  if (isLoading) {
    return (
      <Loader
        type={"TailSpin"}
        color={"var(--accent-color)"}
        height="2em"
        width="100%"
        radius={1}
      />
    );
  }
  const onSubmit = ({ indicationId }: FormFields) => {
    submitGuessMutation.mutate({ indicationId });
  };

  return (
    <div className="p-4 bg-gray-80">
      <form onSubmit={handleSubmit(onSubmit)}>
        {data?.data.indications.map((indication) => (
          <div key={indication.id}>
            <label>
              <input
                {...register("indicationId")}
                type="radio"
                value={indication.id}
              />
              <span
                className={`${
                  loggedUser?.bets.includes(indication.id)
                    ? "text-yellow"
                    : "text-white"
                }`}
              >
                {indication.nominated.name}
              </span>
            </label>
          </div>
        ))}
        <Button color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default CategoryOptions;
