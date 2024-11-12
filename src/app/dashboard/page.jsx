import { Plus } from "lucide-react";
import Link from "next/link";

const page = () => {
  return (
    <div className="pt-16 bg-primary min-h-screen">
      <div className="container mx-auto p-4">
        <Link
          className="bg-secondary flex items-center flex-col w-fit px-10 py-5 rounded-sm"
          href="/dashboard/admin/add-post"
        >
          <Plus />
          <p>Create Blog</p>
        </Link>
      </div>
    </div>
  );
};

export default page;
