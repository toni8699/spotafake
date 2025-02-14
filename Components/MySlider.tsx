"use client "

import { Slider } from "radix-ui";

interface SliderProps {
    value?: number;
    onChange?: (value: number) => void;
}
const Slider: React.FC<SliderProps> = ({
    value = 1,
    onChange
}) => {
    const onValueChange = (newValue: number[]) => {
        onChange?.(newValue[0])
    }
    return (
        <Slider.Root className="relative flex items-center select-none touch-none h-10"
        defaultValue={[1]}
        value={[value]}
        onValueChange={onValueChange}
                    aria-label = "Volume"
        >
            <Slider.Track className={`bg-red-900 w-full relative grow rounded-full h-[3px]`}>
                <radix.Range className={`absolute bg-white rounded-full h-full`} />



            </Slider.Track>
        </Slider.Root>
    )
}

export default Slider