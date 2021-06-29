import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import { Category, Indication, User } from "../../lib/apiEntities";
import { kubrick } from "../../lib/apiClient";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "react-query";
import useAuth from "../../lib/useAuth";
import useDefaultMutation from "../../lib/useDefaultMutation";

interface Props {
  category: Category;
  indications?: Indication[];
}

interface FormFields {
  indicationId: number;
}

const CategoryDetail: React.FC<Props> = ({ category, indications }) => {
  const { register, handleSubmit } = useForm<FormFields>();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const submitGuessMutation = useDefaultMutation<FormFields>(
    `users/${user?.username}/guess/`,
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users", user?.username]);
      },
    }
  );

  const onSubmit = (data: FormFields) => {
    console.log(data);
    submitGuessMutation.mutate(data);
  };

  return (
    <MainLayout>
      <form className="px-10" onSubmit={handleSubmit(onSubmit)}>
        <Card header={<CardHeader>{category.name}</CardHeader>}>
          {indications?.map((indication) => (
            <div
              key={indication.id}
              className={`${
                user?.bets.includes(indication.id) ? "text-yellow" : ""
              }`}
            >
              <label>
                {indication.nominated.name}{" "}
                {user?.bets.includes(indication.id) && "(Your bet) "}
              </label>
              <input
                type="radio"
                {...register("indicationId")}
                value={indication.id}
              />
            </div>
          ))}
          <Button
            color={user ? "primary" : "secondary"}
            type={"submit"}
            disabled={!user}
          >
            {user ? "Submit choice" : "Log in to submit a choice"}
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
        kubrick.get<Indication>(indication)
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
