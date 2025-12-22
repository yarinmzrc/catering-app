import { getTranslations } from "next-intl/server"

import { PageHeader } from "../../../_components/page-header"
import { CategoryForm } from "../_components/category-form"

export default async function NewCategoryPage() {
  const t = await getTranslations("admin.categories")

  return (
    <div className="flex flex-col gap-12">
      <PageHeader>{t("create.title")}</PageHeader>
      <CategoryForm />
    </div>
  )
}
