import React, { useEffect } from "react";
import Image from "next/image";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MainLayout from "../../components/layouts/MainLayout";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import { Category, Indication } from "../../utils/apiEntities";
import { kubrick } from "../../utils/apiClient";
import Button from "../../components/Button";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";
import useAuth from "../../utils/useAuth";
import useDefaultMutation from "../../utils/useDefaultMutation";
import { StarIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";

interface Props {
  category: Category;
  indications?: Indication[];
  nextCategory?: string | null;
  previousCategory?: string | null;
}

interface FormFields {
  indicationId: number;
}

const CategoryDetail: React.FC<Props> = ({
  category,
  indications,
  nextCategory,
  previousCategory,
}) => {
  const { register, watch } = useForm<FormFields>();
  const { indicationId } = watch();
  const router = useRouter();
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

  useEffect(() => {
    console.log({ previousCategory, nextCategory });
  }, [previousCategory, nextCategory]);

  return (
    <MainLayout pageTitle={`${category.name}`}>
      <div className="px-10">
        <Card
          header={<CardHeader>{category.name}</CardHeader>}
          childrenClassName="p-4 text-lg"
        >
          <div className="flex space-x-4 mr-4 rounded-md overflow-y-auto">
            {indications?.map((indication) => (
              <button
                key={indication.id}
                className="block"
                onClick={() =>
                  submitGuessMutation.mutate({ indicationId: indication.id })
                }
                disabled={!loggedUser}
                title={
                  loggedUser
                    ? "Click to submit guess"
                    : "Log in to submit a guess"
                }
              >
                <label
                  className={`block cursor-pointer relative flex-1 transition-colors border-2 ${
                    indicationId == indication.id && !!loggedUser
                      ? "border-yellow"
                      : "border-transparent"
                  }`}
                >
                  {loggedUser?.bets.includes(indication.id) && (
                    <span
                      className="absolute z-10 bg-yellow h-10 shadow-lg strip-path right-2"
                      title="Your current choice"
                    >
                      <StarIcon className=" h-5 w-5 text-gray-900" />
                    </span>
                  )}
                  <Image
                    src={indication.nominated.pictureUrl}
                    width={170}
                    height={253}
                    quality={50}
                    layout={"fixed"}
                    alt={indication.nominated.name}
                  />
                  <input
                    type="radio"
                    className="hidden"
                    {...register("indicationId")}
                    value={indication.id}
                  />
                </label>
                <div
                  className={`text-center font-bold text-sm ${
                    indicationId == indication.id && !!loggedUser
                      ? "text-yellow"
                      : "text-white"
                  }`}
                >
                  {indication.nominated.name}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <Button
              color={previousCategory ? "primary" : "secondary"}
              disabled={!previousCategory}
              onClick={() => router.push(`/categories/${previousCategory}/`)}
            >
              Previous
            </Button>
            <Button
              color={nextCategory ? "primary" : "secondary"}
              disabled={!nextCategory}
              onClick={() => router.push(`/categories/${nextCategory}/`)}
            >
              Next
            </Button>
          </div>
        </Card>
      </div>
    </MainLayout>
  );
};

export default CategoryDetail;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  try {
    const categories = await kubrick.get<Category[]>("categories/");
    const categoryIdx = categories.data.findIndex(
      (c) => c.urlField === context.query.name
    );
    console.log(categories.data);
    if (categoryIdx === -1) {
      return { notFound: true };
    }
    const indications = await Promise.all(
      categories.data[categoryIdx].indications.map((indication) =>
        kubrick.get<Indication>(`indications/${indication}/`)
      )
    );

    const previousCategory =
      categoryIdx - 1 >= 0 ? categories.data[categoryIdx - 1].urlField : null;

    const nextCategory =
      categoryIdx + 1 < categories.data.length - 1
        ? categories.data[categoryIdx + 1].urlField
        : null;

    return {
      props: {
        category: categories.data[categoryIdx],
        indications: indications.map((res) => res.data),
        nextCategory: nextCategory,
        previousCategory: previousCategory,
      },
    };
  } catch (e) {
    return { notFound: true };
  }
}
