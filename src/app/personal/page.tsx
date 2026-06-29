import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon/ComingSoon";

export const metadata: Metadata = {
    title: "My Life - Coming Soon",
};

export default function PersonalPage() {
    return (
        <ComingSoon
            code="Work in progress"
            title="My Life"
            message="A look beyond the code is on its way. This section is under construction. Check back soon!"
        />
    );
}
