import React from "react";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import MainLayout from "../../components/MainLayout";
import Card from "../../components/Card";
import CardHeader from "../../components/CardHeader";
import { Category } from "../../lib/apiEntities";
import { kubrick } from "../../lib/apiClient";

interface Props {
  category: Category;
}

const CategoryDetail: React.FC<Props> = ({ category }) => {
  return (
    <MainLayout>
      <Card header={<CardHeader>{category.name}</CardHeader>} />
    </MainLayout>
  );
};

export default CategoryDetail;

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Props>> {
  try {
    const response = await kubrick.get<Category>(
      `categories/${context.query.name}`
    );
    return { props: { category: response.data } };
  } catch (e) {
    return { notFound: true };
  }
}
