import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";


const Dashboardlayout = async ({
    children
}: {
    children: React.ReactNode
}) => {
    // const apiLimitCount = await getApiLimitCount();
    const apiLimitCount = 0

    return (
        <div className="h-full relative">
            <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
                <Sidebar apiLimitCount={apiLimitCount} />
            </div>
            <main className="md:pl-72 bg-gray-800 h-full">
                <Navbar />
                <div className="my-auto mx-0 bg-gray-800 border-l-2
                border-t-2 border-b-2 border-indigo-500 rounded">
                    {children}

                </div>
            </main>
        </div>
    );
};

export default Dashboardlayout;