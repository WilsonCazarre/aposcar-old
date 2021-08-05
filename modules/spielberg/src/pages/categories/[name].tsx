import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import { Category, Indication } from "../../utils/apiEntities";
import { kubrick } from "../../utils/apiClient";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import useAuth from "../../utils/useAuth";
import useDefaultMutation from "../../utils/useDefaultMutation";

interface Props {
  category: Category;
  indications?: Indication[];
}

interface FormFields {
  indicationId: number;
}

const CategoryDetail: React.FC<Props> = ({ category, indications }) => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { loggedUser } = useAuth();
  const queryClient = useQueryClient();
  const submitGuessMutation = useDefaultMutation<FormFields>(
    `users/${loggedUser?.username}/guess/`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users", loggedUser?.username]);
      },
    }
  );

  const onSubmit = (data: FormFields) => {
    submitGuessMutation.mutate(data);
  };

  return (
    <MainLayout pageTitle={`${category.name}`}>
      <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
        <Card
          header={<CardHeader>{category.name}</CardHeader>}
          childrenClassName="p-4 text-lg"
        >
          {indications?.map((indication) => (
            <div
              key={indication.id}
              className={`${
                loggedUser?.bets.includes(indication.id) ? "text-yellow" : ""
              }`}
            >
              <label>
                {indication.nominated.name}{" "}
                {loggedUser?.bets.includes(indication.id) && "(Your bet) "}
              </label>
              <input
                type="radio"
                {...register("indicationId")}
                value={indication.id}
              />
            </div>
          ))}
          <Button
            color={loggedUser ? "primary" : "secondary"}
            type={"submit"}
            disabled={!loggedUser}
            className="mt-2"
          >
            {loggedUser ? "Submit choice" : "Log in to submit a choice"}
          </Button>
        </Card>
      </form>
    </MainLayout>
  );
};

export default CategoryDetail;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  try {
    const category = await kubrick.get<Category>(
      `categories/${context.query.name}`
    );

    const indications = await Promise.all(
      category.data.indications.map((indication) =>
        kubrick.get<Indication>(`indications/${indication}/`)
      )
    );

    return {
      props: {
        category: category.data,
        indications: indications.map((res) => res.data),
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
