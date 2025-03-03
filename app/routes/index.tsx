import { Form, Link } from "react-router";

export default function Index() {
    return <div className="flex flex-col gap-4 items-center h-screen">
        <div className="flex flex-col items-center justify-center mt-[100px]">
            <h1 className="text-4xl font-bold">Tailwind CSS Generator</h1>
            <p className="text-lg text-gray-500">Generate the Tailwind CSS classes for your project, from the figma design file.</p>
        </div>

        <div className="flex gap-2 items-center justify-center">
            {/* <input type="file" className="hidden" /> */}
            <Form method="post">
                <input type="url" name="figma-design-file" id="figma-design-file" className="border border-gray-300 rounded-md px-4 py-2 min-w-[300px]   " placeholder="Figma Design File URL" />
                <button type="submit" className="bg-black cursor-pointer text-white px-4 py-2 rounded-md">Generate</button>
            </Form>
        </div>

        <div>
            <Link to="/auth/login">Login</Link>
        </div>
    </div>;
}