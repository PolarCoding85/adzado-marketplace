import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  TrophyIcon,
  FlameIcon,
  TargetIcon,
  RocketIcon,
  HeartIcon,
  StarIcon,
  ZapIcon,
  BarChartIcon,
  UsersIcon,
  GlobeIcon,
  ShieldCheckIcon,
  AwardIcon,
  CrownIcon,
  SparklesIcon,
  TimerIcon,
  TrendingUpIcon,
} from "lucide-react"

const achievements = {
  publisher: {
    legendary: [
      {
        icon: <TrophyIcon className='h-6 w-6' />,
        name: "Million Lead Club",
        description: "Delivered over 1 million qualified leads",
        howToEarn: "Reach a total of 1 million approved leads",
        color: "from-yellow-500/20 to-amber-500/20",
        border: "border-yellow-500/50",
      },
      {
        icon: <CrownIcon className='h-6 w-6' />,
        name: "Elite Publisher",
        description: "Maintained Elite status for 12 consecutive months",
        howToEarn:
          "Keep 95%+ acceptance rate and $50k+ weekly revenue for 12 months",
        color: "from-yellow-500/20 to-amber-500/20",
        border: "border-yellow-500/50",
      },
    ],
    epic: [
      {
        icon: <FlameIcon className='h-6 w-6' />,
        name: "90-Day Streak",
        description: "Maintained 90% acceptance rate for 90 days",
        howToEarn:
          "Keep lead acceptance rate above 90% for 90 consecutive days",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
      },
      {
        icon: <RocketIcon className='h-6 w-6' />,
        name: "Scale Master",
        description: "Reached $100k in weekly revenue",
        howToEarn: "Generate $100,000 in revenue in a single week",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
      },
      {
        icon: <GlobeIcon className='h-6 w-6' />,
        name: "Global Domination",
        description: "Successfully operating in 10+ countries",
        howToEarn: "Generate approved leads from 10 different countries",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
      },
    ],
    rare: [
      {
        icon: <TargetIcon className='h-6 w-6' />,
        name: "Perfect Week",
        description: "100% acceptance rate for 7 consecutive days",
        howToEarn: "Maintain 100% lead acceptance rate for an entire week",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
      },
      {
        icon: <HeartIcon className='h-6 w-6' />,
        name: "Trusted Partner",
        description: "95% satisfaction rate for 30 days",
        howToEarn: "Maintain 95% advertiser satisfaction rate for 30 days",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
      },
      {
        icon: <ZapIcon className='h-6 w-6' />,
        name: "Speed Demon",
        description: "Average response time under 30 minutes",
        howToEarn:
          "Maintain average response time under 30 minutes for 30 days",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
      },
    ],
    common: [
      {
        icon: <StarIcon className='h-6 w-6' />,
        name: "Rising Star",
        description: "First 1,000 approved leads",
        howToEarn: "Get your first 1,000 leads approved",
        color: "from-slate-500/20 to-zinc-500/20",
        border: "border-slate-500/50",
      },
      {
        icon: <SparklesIcon className='h-6 w-6' />,
        name: "Quality First",
        description: "First week above 90% acceptance",
        howToEarn: "Achieve 90%+ acceptance rate for 7 consecutive days",
        color: "from-slate-500/20 to-zinc-500/20",
        border: "border-slate-500/50",
      },
    ],
  },
  advertiser: {
    legendary: [
      {
        icon: <TrophyIcon className='h-6 w-6' />,
        name: "Lead Titan",
        description: "Processed over 5 million leads",
        howToEarn: "Process and respond to 5 million leads total",
        color: "from-yellow-500/20 to-amber-500/20",
        border: "border-yellow-500/50",
      },
    ],
    epic: [
      {
        icon: <BarChartIcon className='h-6 w-6' />,
        name: "Volume King",
        description: "Processed 100k leads in one month",
        howToEarn: "Process 100,000 leads in a single month",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
      },
      {
        icon: <TimerIcon className='h-6 w-6' />,
        name: "Lightning Response",
        description: "Average response time under 5 minutes",
        howToEarn: "Maintain sub-5-minute response time for 30 days",
        color: "from-purple-500/20 to-pink-500/20",
        border: "border-purple-500/50",
      },
    ],
    rare: [
      {
        icon: <UsersIcon className='h-6 w-6' />,
        name: "Publisher Favorite",
        description: "90% publisher satisfaction rate",
        howToEarn: "Maintain 90% publisher satisfaction for 60 days",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
      },
      {
        icon: <TrendingUpIcon className='h-6 w-6' />,
        name: "Growth Champion",
        description: "Increased monthly volume by 100%",
        howToEarn: "Double your monthly lead volume and maintain it",
        color: "from-blue-500/20 to-cyan-500/20",
        border: "border-blue-500/50",
      },
    ],
  },
}

export default function GamificationPage() {
  return (
    <div className='min-h-[calc(100vh-4rem)] flex flex-col'>
      <section className='py-8 md:py-12'>
        <div className='mx-auto w-full max-w-7xl px-4'>
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold mb-4'>Achievement Guide</h1>
            <p className='text-gray-400 max-w-2xl mx-auto'>
              Unlock achievements, earn badges, and climb the ranks as you grow
              your business on our marketplace.
            </p>
          </div>

          {/* Publisher Achievements */}
          <div className='mb-16'>
            <div className='flex items-center gap-2 mb-8'>
              <UsersIcon className='h-6 w-6 text-primary' />
              <h2 className='text-2xl font-bold'>Publisher Achievements</h2>
            </div>

            {/* Legendary Tier */}
            <div className='mb-12'>
              <div className='flex items-center gap-2 mb-4'>
                <Badge className='bg-gradient-to-r from-yellow-500/20 to-amber-500/20 border-yellow-500/50'>
                  Legendary
                </Badge>
              </div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {achievements.publisher.legendary.map((achievement) => (
                  <Card
                    key={achievement.name}
                    className={`p-4 bg-gradient-to-r ${achievement.color}`}
                  >
                    <div className='flex items-start gap-3'>
                      <div
                        className={`p-2 rounded-lg bg-white/10 ${achievement.border}`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className='font-semibold'>{achievement.name}</h4>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {achievement.description}
                        </p>
                        <div className='mt-3 pt-3 border-t border-white/10'>
                          <p className='text-xs font-medium'>How to earn:</p>
                          <p className='text-xs text-muted-foreground'>
                            {achievement.howToEarn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Epic Tier */}
            <div className='mb-12'>
              <div className='flex items-center gap-2 mb-4'>
                <Badge className='bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/50'>
                  Epic
                </Badge>
              </div>
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                {achievements.publisher.epic.map((achievement) => (
                  <Card
                    key={achievement.name}
                    className={`p-4 bg-gradient-to-r ${achievement.color}`}
                  >
                    <div className='flex items-start gap-3'>
                      <div
                        className={`p-2 rounded-lg bg-white/10 ${achievement.border}`}
                      >
                        {achievement.icon}
                      </div>
                      <div>
                        <h4 className='font-semibold'>{achievement.name}</h4>
                        <p className='text-sm text-muted-foreground mt-1'>
                          {achievement.description}
                        </p>
                        <div className='mt-3 pt-3 border-t border-white/10'>
                          <p className='text-xs font-medium'>How to earn:</p>
                          <p className='text-xs text-muted-foreground'>
                            {achievement.howToEarn}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Rare & Common Tiers */}
            {["rare", "common"].map((tier) => (
              <div key={tier} className='mb-12'>
                <div className='flex items-center gap-2 mb-4'>
                  <Badge
                    className={`bg-gradient-to-r ${
                      tier === "rare"
                        ? "from-blue-500/20 to-cyan-500/20 border-blue-500/50"
                        : "from-slate-500/20 to-zinc-500/20 border-slate-500/50"
                    }`}
                  >
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </Badge>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {achievements.publisher[
                    tier as keyof typeof achievements.publisher
                  ].map((achievement) => (
                    <Card
                      key={achievement.name}
                      className={`p-4 bg-gradient-to-r ${achievement.color}`}
                    >
                      <div className='flex items-start gap-3'>
                        <div
                          className={`p-2 rounded-lg bg-white/10 ${achievement.border}`}
                        >
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className='font-semibold'>{achievement.name}</h4>
                          <p className='text-sm text-muted-foreground mt-1'>
                            {achievement.description}
                          </p>
                          <div className='mt-3 pt-3 border-t border-white/10'>
                            <p className='text-xs font-medium'>How to earn:</p>
                            <p className='text-xs text-muted-foreground'>
                              {achievement.howToEarn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Advertiser Achievements */}
          <div>
            <div className='flex items-center gap-2 mb-8'>
              <ShieldCheckIcon className='h-6 w-6 text-primary' />
              <h2 className='text-2xl font-bold'>Advertiser Achievements</h2>
            </div>

            {/* Advertiser Achievement Tiers */}
            {["legendary", "epic", "rare"].map((tier) => (
              <div key={tier} className='mb-12'>
                <div className='flex items-center gap-2 mb-4'>
                  <Badge
                    className={`bg-gradient-to-r ${
                      tier === "legendary"
                        ? "from-yellow-500/20 to-amber-500/20 border-yellow-500/50"
                        : tier === "epic"
                        ? "from-purple-500/20 to-pink-500/20 border-purple-500/50"
                        : "from-blue-500/20 to-cyan-500/20 border-blue-500/50"
                    }`}
                  >
                    {tier.charAt(0).toUpperCase() + tier.slice(1)}
                  </Badge>
                </div>
                <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
                  {achievements.advertiser[
                    tier as keyof typeof achievements.advertiser
                  ].map((achievement) => (
                    <Card
                      key={achievement.name}
                      className={`p-4 bg-gradient-to-r ${achievement.color}`}
                    >
                      <div className='flex items-start gap-3'>
                        <div
                          className={`p-2 rounded-lg bg-white/10 ${achievement.border}`}
                        >
                          {achievement.icon}
                        </div>
                        <div>
                          <h4 className='font-semibold'>{achievement.name}</h4>
                          <p className='text-sm text-muted-foreground mt-1'>
                            {achievement.description}
                          </p>
                          <div className='mt-3 pt-3 border-t border-white/10'>
                            <p className='text-xs font-medium'>How to earn:</p>
                            <p className='text-xs text-muted-foreground'>
                              {achievement.howToEarn}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
