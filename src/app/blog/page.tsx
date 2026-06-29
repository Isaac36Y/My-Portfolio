import type { Metadata } from "next";
import ComingSoon from "@/components/ComingSoon/ComingSoon";

export const metadata: Metadata = {
    title: "My Blog - Coming Soon",
};

export default function BlogPage() {
    return (
        <ComingSoon
            code="Work in progress"
            title="My Blog"
            message="I'm still writing the first posts. This section is under construction. Check back soon!"
        />
    );
}
