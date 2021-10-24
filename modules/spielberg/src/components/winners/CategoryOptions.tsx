import React, { useEffect } from "react";
import { Category, CategoryDetail } from "../../utils/apiEntities";
import { useQuery, useQueryClient } from "react-query";
import { kubrick } from "../../utils/apiClient";
import { AxiosResponse } from "axios";
import Loader from "react-loader-spinner";
import useDefaultMutation from "../../utils/useDefaultMutation";
import useAuth from "../../utils/useAuth";
import { useForm, FormProvider } from "react-hook-form";
import CategoryOption from "./CategoryOption";

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
    () => kubrick.get(`categories/${category.urlField}/`)
  );
  const { handleSubmit, watch, ...methods } = useForm<FormFields>();
  const watchIndicationId = watch("indicationId");

  useEffect(() => {
    if (watchIndicationId && !loggedUser?.bets.includes(watchIndicationId)) {
      handleSubmit(onSubmit)();
    }
  }, [watchIndicationId, handleSubmit]);

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
    <div className="bg-gray-80 mt-2">
      <FormProvider {...{ handleSubmit, watch, ...methods }}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          {data?.data.indications.map((indication) => (
            <CategoryOption indication={indication} key={indication.id} />
          ))}
        </form>
      </FormProvider>
    </div>
  );
};

export default CategoryOptions;
