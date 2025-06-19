import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import { SideNavItemGroup } from "@/types/sidebar";
import React from "react";
import { SidebarItems } from "./SidebarItems";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentStatus } from "@/hooks/use-current-status";

const SideBarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const role = useCurrentRole();
  const status = useCurrentStatus();
  const { toggleCollapse } = useSideBarToggle();

  if (!role || !menuGroup.allowedRole.includes(role)) {
    return null;
  }
  if (!status || !menuGroup.allowedStatus.includes(status)) {
    return null;
  }

  return (
    <div className="space-y-1">
      {!toggleCollapse && (
        <div className="px-3 py-2">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-body dark:text-bodydark2">
            {menuGroup.title}
          </h3>
        </div>
      )}
      <div className="space-y-1">
        {menuGroup.menuList?.map((item, index) => (
          <SidebarItems key={index} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SideBarMenuGroup;
