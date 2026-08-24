
interface ComponentsCardProps {
    title?: string,
    children : React.ReactNode,
    className?: string,
    hidden?: boolean,
}

const ComponentsCard: React.FC<ComponentsCardProps> = ({
    title,
    children,
    className = "",
    hidden = false,
}) => {
    return (
        <div className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3
        ${className}`}
        >
            <div className={`px-6 py-5 ${hidden ? "hidden" : ""}`}>
                <h3 className="text-base font-bold text-gray-800 dark:text-white/90">
                    {title}
                </h3>
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
                <div className="space-y-6">{children}</div>
            </div>
        </div>
    )
};

export default ComponentsCard;