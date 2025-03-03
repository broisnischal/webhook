import { Link, Outlet } from "react-router";

export default function AuthLayout() {
    return (
        <div className="flex h-screen w-full items-center justify-center px-6">
            <div className="fixed left-6 top-6">
                <h1>Login to Tailwind Generator</h1>
            </div>
            <div className="mx-auto w-full sm:w-[356px]">
                <Outlet />
            </div>
        </div>
    );
}
