import { ArrowLeftOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

const BackButton = () => {
    const navigate = useNavigate()

    return (
        <Link
            to=".."
            onClick={(e) => {
                e.preventDefault();
                navigate(-1);
            }}
            className="inline-flex items-center gap-1 px-3 text-sm font-medium bg-blue-600 border border-blue-800 rounded-md shadow-sm hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
            <span className="text-white"><ArrowLeftOutlined /> Back</span>
        </Link>
    );
};

export default BackButton;