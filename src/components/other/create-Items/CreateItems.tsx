import ComponentsCard from "@/components/components-cards/ComponentCard";
import Button from "@/components/ui/Button/Button";
import { MultipleTshirt, Tshirt } from "@/icons";

export default function CreateItems() {

    return(
        <ComponentsCard className="flex-1 min-h-0 flex flex-col items-center justify-center" hidden>
            <Button className="w-70 h-70 shrink-0 p-7 m-5 flex flex-col items-center justify-center">
                <Tshirt className="w-40 h-40"/>
                <span className="text-center">
                    Create a multiple variants of 
                    the same item (different 
                    size/color of a shirt).
                </span>
            </Button>
            <Button className="w-70 h-70 shrink-0 p-7 m-5 flex flex-col items-center justify-center">
                <Tshirt className="w-40 h-40"/>
                <span className="text-center">
                    Create a standalone item that
                    you sell
                </span>
            </Button>
        </ComponentsCard>
    )
}