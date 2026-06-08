import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { MissionSection } from '@/components/MissionSection'
import { BenefitsSection } from '@/components/BenefitsSection'
import { TargetAudienceSection } from '@/components/TargetAudienceSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { ImpactStatsSection } from '@/components/ImpactStatsSection'
import { CommunityHighlightsSection } from '@/components/CommunityHighlightsSection'
import { EventsPreviewSection } from '@/components/EventsPreviewSection'
import { FounderSpotlightSection } from '@/components/FounderSpotlightSection'
import { FAQSection } from '@/components/FAQSection'
import { CTASection } from '@/components/CTASection'
import { Footer } from '@/components/Footer'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <MissionSection />
        <BenefitsSection />
        <TargetAudienceSection />
        {/* <HowItWorksSection /> */}
        <ImpactStatsSection />
        <CommunityHighlightsSection />
        <EventsPreviewSection />
        <FounderSpotlightSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
