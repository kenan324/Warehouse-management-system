import { twMerge } from "tailwind-merge";

interface ComponentsCardProps {
    title?: string,
    children : React.ReactNode,
    className?: string,
    hidden?: boolean,
}

const ComponentsCard: React.FC<ComponentsCardProps> = ({
    title = "",
    children,
    className = "",
}) => {
    return (
        <div className={twMerge( `rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3
        `, className)}
        >
            <div className={`px-6 py-5 border-b border-gray-100 dark:border-gray-800 ${title === "" ? "hidden" : ""}`}>
                <h3 className="text-base font-bold text-gray-800 dark:text-white/90">
                    {title}
                </h3>
            </div>
            <div className="flex flex-col space-y-6 p-4 min-h-0 flex-1 sm:p-6">{children}</div>
        </div>
    )
};

export default ComponentsCard;