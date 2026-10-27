import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Heading } from "@/components/ui/Heading";
import { ProofList } from "@/components/ui/ProofList";
import { Section } from "@/components/ui/Section";
import { Text } from "@/components/ui/Text";
import { categories } from "@/content/categories";

const categoryById = (id: string) => categories.find((category) => category.id === id);

export function generateStaticParams() {
  return categories.map((category) => ({ category: category.id }));
}

export async function generateMetadata({ params }: PageProps<"/shop/[category]">): Promise<Metadata> {
  const { category: id } = await params;
  const category = categoryById(id);
  if (!category) return {};
  return { title: category.label, description: category.description };
}

/** Category placeholder: the route and layout exist, the listing is empty until real catalogue data is supplied. */
export default function CategoryPage(props: PageProps<"/shop/[category]">) {
  // `params` is read behind Suspense so navigations stay instant (Cache Components validation).
  return (
    <Suspense fallback={<Section spacing="none" className="min-h-[60vh]" aria-busy="true" />}>
      <CategoryContent params={props.params} />
    </Suspense>
  );
}

async function CategoryContent({ params }: { params: PageProps<"/shop/[category]">["params"] }) {
  const { category: id } = await params;
  const category = categoryById(id);
  if (!category) notFound();

  return (
    <Section spacing="none" className="pb-20 pt-8 md:pb-32 md:pt-14" aria-labelledby="category-heading">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6">
          <Link
            href="/shop"
            className="inline-flex min-h-11 w-fit items-center font-sans text-ui text-indigo underline underline-offset-[0.35em]"
          >
            The shop
          </Link>
          <Eyebrow>Category</Eyebrow>
          <Heading as="h1" size="display" id="category-heading">
            {category.label}
          </Heading>
          <Text className="max-w-measure">{category.description}</Text>
        </div>

        <ProofList
          className="max-w-2xl"
          items={[
            { label: "Products in this category", value: "Pending catalogue data" },
            { label: "Filters and search", value: "To be built with the catalogue" },
          ]}
        />
      </Container>
    </Section>
  );
}
