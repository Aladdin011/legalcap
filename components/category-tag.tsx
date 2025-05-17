import type { Category } from "@/types/content"
import { cn } from "@/lib/utils"

interface CategoryTagProps {
  category: Category
}

const categoryStyles: Record<Category, string> = {
  mindfulness: "bg-tag-mindfulness text-deep-charcoal",
  "self-care": "bg-tag-selfcare text-deep-charcoal",
  meditation: "bg-muted-lavender/40 text-deep-charcoal",
  healing: "bg-blush-pink/60 text-deep-charcoal",
  community: "bg-sage-green/40 text-deep-charcoal",
}

const categoryLabels: Record<Category, string> = {
  mindfulness: "Mindfulness",
  "self-care": "Self-Care",
  meditation: "Meditation",
  healing: "Healing",
  community: "Community",
}

export function CategoryTag({ category }: CategoryTagProps) {
  return (
    <span className={cn("inline-block rounded-full px-3 py-1 text-xs font-medium", categoryStyles[category])}>
      {categoryLabels[category]}
    </span>
  )
}
