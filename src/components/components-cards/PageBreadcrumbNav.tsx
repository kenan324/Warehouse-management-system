
"use client"

interface PageBreadcrumbNavProps {
    pageTitle: string;
    path: string;

}

const PageBreadcrumbNav: React.FC<PageBreadcrumbNavProps> = ({ pageTitle, path }) => {
    return(
        <div>
            <h1 className="text-2xl font-semibold text-gray-900 mb-2">{pageTitle}</h1>
            <h2 className="text-sm text-gray-900 ml-3">{path}</h2>
        </div>
    );
}
export default PageBreadcrumbNav;