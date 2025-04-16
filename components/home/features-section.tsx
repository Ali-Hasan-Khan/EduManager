"use client";

import { BookOpen, Calendar, Users, GraduationCap, School, Library } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

export function FeaturesSection() {
  return (
    <div className="py-16 px-4 md:px-8 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Key Features
        </h2>
        <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
          <GridItem
            area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
            icon={<Users className="h-4 w-4 text-primary" />}
            title="Student Management"
            description="Efficiently manage student records, attendance, and academic progress in one centralized platform."
          />

          <GridItem
            area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
            icon={<Calendar className="h-4 w-4 text-primary" />}
            title="Schedule Management"
            description="Create and manage class schedules, assignments, and events with our intuitive calendar system."
          />

          <GridItem
            area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
            icon={<BookOpen className="h-4 w-4 text-primary" />}
            title="Academic Tools"
            description="Access comprehensive academic tools for grading, reporting, and curriculum management."
          />

          <GridItem
            area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
            icon={<GraduationCap className="h-4 w-4 text-primary" />}
            title="Performance Tracking"
            description="Monitor and analyze student performance with detailed reports and analytics."
          />

          <GridItem
            area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
            icon={<School className="h-4 w-4 text-primary" />}
            title="Resource Management"
            description="Efficiently manage school resources, facilities, and staff allocation."
          />
        </ul>
      </div>
    </div>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none ${area}`}>
      <div className="relative h-full rounded-2xl border-1 border-gray-800 p-2 md:rounded-3xl md:p-3 shadow-[0_0_15px_rgba(0,0,0,0.3)]">
        <GlowingEffect
          spread={60}
          glow={true}
          disabled={false}
          proximity={80}
          inactiveZone={0.01}
          variant="default"
          className="[--gradient:radial-gradient(circle,_#dd7bbb_20%,_#dd7bbb00_40%),_radial-gradient(circle_at_40%_40%,_#d79f1e_15%,_#d79f1e00_30%),_radial-gradient(circle_at_60%_60%,_#5a922c_20%,_#5a922c00_40%),_radial-gradient(circle_at_40%_60%,_#4c7894_20%,_#4c789400_40%),_repeating-conic-gradient(from_236.84deg_at_50%_50%,_#dd7bbb_0%,_#d79f1e_calc(25%/var(--repeating-conic-gradient-times)),_#5a922c_calc(50%/var(--repeating-conic-gradient-times)),_#4c7894_calc(75%/var(--repeating-conic-gradient-times)),_#dd7bbb_calc(100%/var(--repeating-conic-gradient-times)))]"
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl bg-gray-900/50 p-6 md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-2 border-gray-800 p-2 shadow-[0_0_10px_rgba(0,0,0,0.2)]">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 font-sans text-xl/[1.375rem] font-semibold text-balance text-white md:text-2xl/[1.875rem]">
                {title}
              </h3>
              <p className="font-sans text-sm/[1.125rem] text-gray-400 md:text-base/[1.375rem]">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}; 