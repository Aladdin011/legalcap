import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PhilanthropyHero } from "@/components/philanthropy/philanthropy-hero"
import { PhilanthropyMission } from "@/components/philanthropy/philanthropy-mission"
import { PhilanthropyInitiatives } from "@/components/philanthropy/philanthropy-initiatives"
import { PhilanthropyImpact } from "@/components/philanthropy/philanthropy-impact"
import { PhilanthropyPartners } from "@/components/philanthropy/philanthropy-partners"
import { PhilanthropyCallToAction } from "@/components/philanthropy/philanthropy-call-to-action"

export default function PhilanthropyPage() {
  return (
    <>
      <Navigation />
      <main className="flex flex-col min-h-screen">
        <PhilanthropyHero />
        <PhilanthropyMission />
        <PhilanthropyInitiatives />
        <PhilanthropyImpact />
        <PhilanthropyPartners />
        <PhilanthropyCallToAction />
      </main>
      <Footer />
    </>
  )
}
