import ComingSoon from "@/components/ComingSoon/ComingSoon";

export default function NotFound() {
    return (
        <ComingSoon
            code="404"
            title="Page not found"
            message="This page doesn't exist (yet). It might still be a work in progress."
        />
    );
}
